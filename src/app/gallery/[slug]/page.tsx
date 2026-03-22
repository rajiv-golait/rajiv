import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { galleryItemBySlugQuery } from '@/lib/queries'

export default async function GalleryItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await client.fetch(galleryItemBySlugQuery, { slug })

  if (!item) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#050510] text-[#e3e0f3] py-24 px-8 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #4d2dff 2px, transparent 2px)', backgroundSize: '32px 32px', opacity: 0.1 }}></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">
        {item.image && (
          <div className="w-full md:w-2/3 border-[3px] border-[#e3e0f3] p-2 bg-[#0a0808] shadow-[0_20px_60px_-15px_rgba(255,20,147,0.3)]">
            <div className={`relative w-full ${item.aspectRatio === '16:9' ? 'aspect-video' : item.aspectRatio === '9:16' ? 'aspect-[9/16]' : item.aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square'}`}>
              <Image 
                src={urlFor(item.image).width(1600).url()} 
                alt={item.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}
        
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          <div className="inline-block bg-tertiary text-[#1a1a1a] px-6 py-2 -rotate-2 self-start shadow-[4px_4px_0px_0px_#4d2dff]">
            <h1 className="font-comic text-3xl uppercase tracking-widest">{item.title}</h1>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4 border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-primary uppercase tracking-widest w-24">Type</span>
              <span className="font-mono text-xs uppercase">{item.type}</span>
            </div>
            
            {item.location && (
              <div className="flex gap-4 border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-secondary uppercase tracking-widest w-24">Location</span>
                <span className="font-mono text-xs uppercase">{item.location}</span>
              </div>
            )}
            
            {item.captureDate && (
              <div className="flex gap-4 border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-tertiary uppercase tracking-widest w-24">Date</span>
                <span className="font-mono text-xs uppercase">{new Date(item.captureDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
          </div>
          
          {item.videoUrl && (
            <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-4 bg-primary text-on-primary-container font-bangers text-2xl py-4 px-8 shadow-[6px_6px_0px_0px_#3d06f2] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-fit">
              <span className="material-symbols-outlined">play_circle</span>
              WATCH REEL
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
