import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const secret = process.env.SANITY_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME)
    const body = await req.text() // Read the body into a string
    
    // Verify signature (only if secret is set in env)
    if (secret && signature && !isValidSignature(body, signature, secret)) {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(body)
    const { _type, slug } = payload

    if (_type) {
      // Always revalidate the homepage for general content updates
      revalidatePath('/')

      // Selectively revalidate dynamic detail routes based on schema type
      if (_type === 'project' && slug?.current) {
        revalidatePath(`/projects/${slug.current}`)
      }
      
      if (_type === 'galleryItem' && slug?.current) {
        revalidatePath(`/gallery/${slug.current}`)
      }

      return NextResponse.json({ 
        success: true, 
        message: `Revalidated ${_type} successfully` 
      })
    }

    return NextResponse.json({ success: false, message: 'Missing _type in payload' }, { status: 400 })

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown webhook error'
    console.error('Webhook error:', message)
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
