import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  fork: boolean
}

export async function POST(req: Request) {
  // Add a simple API key check to prevent public abuse of this sync route
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.SYNC_API_KEY}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const username = process.env.GITHUB_USERNAME || 'rajiv'
    // Fetch user repositories from GitHub
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
    if (!res.ok) throw new Error(`GitHub API responded with status: ${res.status}`)
    const repos = (await res.json()) as GitHubRepo[]

    const myRepos = repos.filter((repo) => !repo.fork)

    // Using a write-enabled Sanity client
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false // Must bypass CDN for mutations
    })

    const transaction = writeClient.transaction()

    for (const repo of myRepos) {
      const documentId = `github-repo-${repo.id}`
      const projectDoc = {
        _id: documentId,
        _type: 'project',
        title: repo.name.replace(/-/g, ' '),
        slug: { current: repo.name },
        tagline: repo.description || 'No description provided.',
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        isVisible: true,
        source: 'github',
        githubRepoId: repo.id,
        category: 'hardware', // fallback category
        techStack: repo.language ? [repo.language] : []
      }

      // Upsert: Create if it doesn't exist, otherwise replace fully or patch specific fields.
      // We will use createOrReplace since it's a direct sync.
      transaction.createOrReplace(projectDoc)
    }

    await transaction.commit()

    return NextResponse.json({ success: true, count: myRepos.length, message: 'GitHub repos synced' })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown GitHub sync error'
    console.error('GitHub Sync Error:', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
