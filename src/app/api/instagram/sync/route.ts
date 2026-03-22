import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

type InstagramMedia = {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url?: string
  permalink: string
  thumbnail_url?: string
  timestamp?: string
}

function inferAspectRatio(media: InstagramMedia) {
  if (media.media_type === 'VIDEO') return '9:16'
  return '4:5'
}

function inferType(media: InstagramMedia) {
  if (media.media_type === 'VIDEO') return 'reel'
  return 'photo'
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.SYNC_API_KEY}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const instagramAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  const writeToken = process.env.SANITY_API_WRITE_TOKEN

  if (!accessToken || !instagramAccountId || !writeToken) {
    return NextResponse.json(
      {
        error: 'Missing Instagram sync configuration',
        required: ['INSTAGRAM_ACCESS_TOKEN', 'INSTAGRAM_BUSINESS_ACCOUNT_ID', 'SANITY_API_WRITE_TOKEN'],
      },
      { status: 400 }
    )
  }

  try {
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v22.0/${instagramAccountId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`,
      { cache: 'no-store' }
    )

    if (!mediaResponse.ok) {
      throw new Error(`Instagram API responded with status: ${mediaResponse.status}`)
    }

    const payload = (await mediaResponse.json()) as { data?: InstagramMedia[] }
    const mediaItems = payload.data ?? []

    const writeClient = client.withConfig({
      token: writeToken,
      useCdn: false,
    })

    const transaction = writeClient.transaction()

    for (const media of mediaItems) {
      transaction.createOrReplace({
        _id: `instagram-media-${media.id}`,
        _type: 'galleryItem',
        title: media.caption?.slice(0, 80) || `Instagram ${inferType(media)}`,
        slug: { current: `instagram-${media.id}` },
        type: inferType(media),
        aspectRatio: inferAspectRatio(media),
        videoUrl: media.media_type === 'VIDEO' ? media.permalink : undefined,
        captureDate: media.timestamp?.slice(0, 10),
        isVisible: true,
      })
    }

    await transaction.commit()

    return NextResponse.json({
      success: true,
      imported: mediaItems.length,
      note: 'Instagram sync imports metadata and reel permalinks. Remote image asset upload can be added next if needed.',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown Instagram sync error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
