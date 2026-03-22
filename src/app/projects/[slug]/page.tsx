import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '@/lib/sanity'
import { projectBySlugQuery } from '@/lib/queries'

type ProjectImage = Parameters<typeof urlFor>[0]

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-on-background py-32 px-8">
      <div className="max-w-4xl mx-auto comic-card p-12 relative neon-glow-blue border-[3px] border-secondary-container">
        {/* Decor */}
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-primary/40 pointer-events-none uppercase">
          PROJECT_ID // {project.slug?.current || 'UNK'}
        </div>
        
        <header className="mb-12">
          <div className="inline-block bg-tertiary text-[#1a1a1a] px-4 py-1 -rotate-1 mb-6 shadow-[4px_4px_0px_0px_var(--color-secondary-container)]">
            <h1 className="font-comic text-4xl uppercase tracking-widest">{project.title}</h1>
          </div>
          {project.tagline && (
            <p className="font-headline text-2xl text-secondary max-w-2xl leading-tight border-l-4 border-secondary pl-4">
              {project.tagline}
            </p>
          )}
        </header>

        {project.thumbnail && (
          <div className="relative w-full aspect-video border-[3px] border-comic-border mb-12 shadow-[8px_8px_0px_0px_var(--color-primary-container)]">
            <Image 
              src={urlFor(project.thumbnail).width(1200).url()} 
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6 opacity-80 leading-relaxed text-sm">
            {project.description ? (
              <PortableText value={project.description} />
            ) : (
              <p>No description provided for this project.</p>
            )}
            
            {project.images && project.images.length > 0 && (
              <div className="mt-12 space-y-8">
                <h3 className="font-headline font-bold text-xl uppercase tracking-tighter text-primary">Technical Exhibits</h3>
                {project.images.map((img: ProjectImage, i: number) => (
                  <div key={i} className="relative w-full aspect-video border-2 border-white/10">
                    <Image src={urlFor(img).width(800).url()} alt={`${project.title} exhibit ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <aside className="flex flex-col gap-8">
            <div className="bg-surface-container-low p-6 border-l-4 border-secondary-container">
              <h4 className="font-mono text-xs text-secondary-container mb-4 uppercase tracking-widest font-bold">Tech Node</h4>
              <ul className="flex flex-wrap gap-2">
                {project.techStack?.map((tech: string, i: number) => (
                  <li key={i} className="font-mono text-[10px] uppercase border border-secondary/30 px-2 py-1 text-secondary">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            
            {(project.githubUrl || project.liveUrl) && (
              <div className="bg-surface-container-low p-6 border-l-4 border-primary-container space-y-4">
                <h4 className="font-mono text-xs text-primary-container mb-4 uppercase tracking-widest font-bold">Access Links</h4>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">code</span>
                    <span className="font-bold underline underline-offset-4 decoration-primary/30">Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">open_in_new</span>
                    <span className="font-bold underline underline-offset-4 decoration-primary/30">Live Deployment</span>
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}
