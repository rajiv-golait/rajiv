"use client";

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { getGalleryAspectClass, getInstagramHandle } from '@/lib/portfolio'
import { urlFor } from '@/lib/sanity'

type GalleryItem = {
  _id: string
  title?: string | null
  slug?: { current?: string | null } | null
  type?: string | null
  aspectRatio?: string | null
  image?: unknown
  videoUrl?: string | null
} | null

type Settings = {
  falconInstagram?: string | null
} | null

function getEmbedUrl(url?: string | null) {
  if (!url) return null

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1` : null
  }

  const instagramMatch = url.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i)
  if (instagramMatch?.[1]) {
    return `https://www.instagram.com/reel/${instagramMatch[1]}/embed/captioned/?autoplay=1`
  }

  if (url.endsWith('.mp4') || url.includes('.mp4?')) {
    return url
  }

  return null
}

function ReelCard({
  item,
  activeId,
  setActiveId,
}: {
  item: NonNullable<GalleryItem>
  activeId: string | null
  setActiveId: (id: string | null) => void
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const embedUrl = getEmbedUrl(item.videoUrl)
  const isActive = activeId === item._id

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const startHoverTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setActiveId(item._id), 2000)
  }

  const stopHoverTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="masonry-item mx-auto w-full max-w-[320px]"
      initial={{ opacity: 0, y: 18 }}
      onMouseEnter={startHoverTimer}
      onMouseLeave={stopHoverTimer}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <button className="block w-full text-left" onClick={() => setActiveId(isActive ? null : item._id)} type="button">
        <div className="comic-card overflow-hidden bg-[#0a0a14] transition-transform duration-300 hover:-translate-y-1">
          <div className={`relative overflow-hidden bg-black ${getGalleryAspectClass(item.aspectRatio || '9:16')}`}>
            {isActive && embedUrl ? (
              embedUrl.endsWith('.mp4') || embedUrl.includes('.mp4?') ? (
                <video autoPlay className="h-full w-full object-cover" controls={false} loop muted playsInline src={embedUrl} />
              ) : (
                <iframe
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full scale-[1.01]"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={embedUrl}
                  title={item.title || 'Reel'}
                />
              )
            ) : item.image ? (
              <Image
                alt={item.title || 'Reel thumbnail'}
                className="h-full w-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                src={urlFor(item.image).url()}
              />
            ) : (
              <div className="spider-skeleton absolute inset-0 border-0" />
            )}
          </div>
        </div>
      </button>
    </motion.article>
  )
}

function PhotoCard({ item }: { item: NonNullable<GalleryItem> }) {
  const href = item.slug?.current ? `/gallery/${item.slug.current}` : '#'

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="masonry-item"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <Link className="block" href={href}>
        <div className="comic-card overflow-hidden bg-[#0a0a14] transition-transform duration-300 hover:-translate-y-1">
          <div className={`relative ${getGalleryAspectClass(item.aspectRatio)}`}>
            {item.image ? (
              <Image
                alt={item.title || 'Photograph'}
                className="h-full w-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                src={urlFor(item.image).url()}
              />
            ) : (
              <div className="spider-skeleton absolute inset-0 border-0" />
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function GallerySkeleton() {
  return (
    <div className="space-y-14">
      {[0, 1].map((section) => (
        <div key={section} className="space-y-5">
          <div className="spider-skeleton h-8 w-40 border-0" />
          <div className="masonry">
            {['9:16', '4:5', '16:9'].map((ratio, index) => (
              <div key={`${section}-${ratio}-${index}`} className="masonry-item comic-card overflow-hidden">
                <div className={`spider-skeleton ${getGalleryAspectClass(ratio)}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Gallery({
  items,
  settings,
}: {
  items: GalleryItem[] | null
  settings: Settings
}) {
  const safeItems = useMemo(() => (items ?? []).filter(Boolean) as NonNullable<GalleryItem>[], [items])
  const reels = safeItems.filter((item) => item.type === 'reel' || item.type === 'cinematic')
  const photos = safeItems.filter((item) => item.type === 'photo' || item.type === 'bts')
  const handle = getInstagramHandle(settings?.falconInstagram)
  const [activeReelId, setActiveReelId] = useState<string | null>(null)

  return (
    <section className="relative min-h-screen bg-[#08070d] pt-28 pb-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,13,0.86),rgba(8,7,13,1))]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.6px, transparent 0.6px)', backgroundSize: '18px 18px' }} />

      <div className="section-shell relative z-10">
        <header className="mb-14 max-w-2xl">
          <div className="mb-5 inline-block bg-tertiary px-6 py-2 tilted-caption">
            <h1 className="font-comic text-[28px] uppercase tracking-tight text-[#1a1a1a] sm:text-4xl">SHOT BY FALCON</h1>
          </div>
          <p className="font-display text-2xl italic text-[#f3eefc] sm:text-3xl">
            Frames. Motion. Light.
          </p>
        </header>

        {safeItems.length > 0 ? (
          <div className="space-y-18">
            <section className="space-y-5">
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight text-primary-container sm:text-3xl">Reels</h2>
              {reels.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6 md:justify-start">
                  {reels.map((item) => (
                    <ReelCard key={item._id} activeId={activeReelId} item={item} setActiveId={setActiveReelId} />
                  ))}
                </div>
              ) : (
                <div className="comic-card p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-on-background/55">No reels uploaded yet.</p>
                </div>
              )}
            </section>

            <section className="space-y-5">
              <h2 className="font-headline text-2xl font-black uppercase tracking-tight text-secondary sm:text-3xl">Photographs</h2>
              {photos.length > 0 ? (
                <div className="masonry">
                  {photos.map((item) => (
                    <PhotoCard key={item._id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="comic-card p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-on-background/55">No photographs uploaded yet.</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <GallerySkeleton />
        )}

        {settings?.falconInstagram && handle ? (
          <footer className="mt-20">
            <a className="inline-flex items-center gap-4 font-headline text-xl font-black uppercase tracking-tight text-on-background transition-colors hover:text-primary-container" href={settings.falconInstagram} rel="noreferrer" target="_blank">
              <span>{handle}</span>
              <span className="material-symbols-outlined text-primary-container">north_east</span>
            </a>
          </footer>
        ) : null}
      </div>
    </section>
  )
}
