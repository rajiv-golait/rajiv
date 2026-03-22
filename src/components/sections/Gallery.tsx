"use client";

import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import Image from 'next/image'

import { getGalleryAspectClass, getInstagramHandle } from '@/lib/portfolio'
import { urlFor } from '@/lib/sanity'

type GalleryItem = {
  _id: string
  title?: string | null
  type?: string | null
  aspectRatio?: string | null
  image?: unknown
  instagramUrl?: string | null
  videoUrl?: string | null
  videoFile?: { asset?: { url?: string | null } | null } | null
  videoOrientation?: string | null
  isRotatedPhoneVideo?: boolean | null
  location?: string | null
  captureDate?: string | null
} | null

type Settings = {
  instagramUrl?: string | null
  falconInstagram?: string | null
} | null

type FilterKey = 'all' | 'photos' | 'reels' | 'cinematic' | 'bts'

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'ALL' },
  { key: 'photos', label: 'PHOTOS' },
  { key: 'reels', label: 'REELS' },
  { key: 'cinematic', label: 'CINEMATIC' },
  { key: 'bts', label: 'BTS' },
]

function matchesFilter(itemType: string | null | undefined, activeFilter: FilterKey) {
  switch (activeFilter) {
    case 'photos':
      return itemType === 'photo'
    case 'reels':
      return itemType === 'reel'
    case 'cinematic':
      return itemType === 'cinematic'
    case 'bts':
      return itemType === 'bts'
    case 'all':
    default:
      return true
  }
}

function getTypeLabel(type?: string | null) {
  switch (type) {
    case 'reel':
      return 'REEL'
    case 'cinematic':
      return 'CINEMATIC'
    case 'bts':
      return 'BTS'
    case 'photo':
    default:
      return 'PHOTO'
  }
}

function getTypeBadgeClass(type?: string | null) {
  switch (type) {
    case 'reel':
      return 'bg-[#4d2dff] text-white'
    case 'cinematic':
      return 'bg-[#9b30ff] text-white'
    case 'bts':
      return 'bg-[#1a1a35] text-[#6b6b8d]'
    case 'photo':
    default:
      return 'bg-[#ff1493] text-white'
  }
}

function getVideoSource(item: NonNullable<GalleryItem>) {
  return item.videoFile?.asset?.url || item.videoUrl || null
}

function getInstagramEmbedUrl(url?: string | null) {
  if (!url) return null

  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i)
  if (!match?.[1]) return null

  return `https://www.instagram.com/reel/${match[1]}/embed/captioned/?autoplay=1`
}

function formatCaptureDate(value?: string | null) {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function GallerySkeleton() {
  const placeholders = ['4:5', '16:9', '1:1', '9:16', '3:2', '2:3']

  return (
    <div className="masonry">
      {placeholders.map((ratio, index) => (
        <div key={`${ratio}-${index}`} className="masonry-item">
          <div className="relative overflow-hidden bg-[#0e0e1a]">
            <div
              className="absolute inset-0 z-[2] opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              }}
            />
            <div
              className={ratio === '3:2' ? 'aspect-[3/2]' : ratio === '2:3' ? 'aspect-[2/3]' : getGalleryAspectClass(ratio)}
              style={{
                background: 'linear-gradient(90deg, #0e0e1a 0%, #1a1a2e 50%, #0e0e1a 100%)',
                backgroundSize: '200% 100%',
                animation: 'gallery-shimmer 1.8s infinite linear',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function GalleryOverlay({
  items,
  activeIndex,
  closeOverlay,
  openPrev,
  openNext,
}: {
  items: NonNullable<GalleryItem>[]
  activeIndex: number | null
  closeOverlay: () => void
  openPrev: () => void
  openNext: () => void
}) {
  const activeItem = activeIndex === null ? null : items[activeIndex]

  useEffect(() => {
    if (activeItem === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeOverlay()
      if (event.key === 'ArrowLeft') openPrev()
      if (event.key === 'ArrowRight') openNext()
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeItem, closeOverlay, openNext, openPrev])

  if (activeItem === null) return null

  const videoSource = getVideoSource(activeItem)
  const hasVideo = Boolean(videoSource)
  const imageUrl = activeItem.image ? urlFor(activeItem.image).url() : null
  const metadata = [activeItem.location, formatCaptureDate(activeItem.captureDate)].filter(Boolean).join(' · ')

  return (
    <div className="fixed inset-0 z-[80] bg-[rgba(5,5,16,0.97)]">
      <button
        aria-label="Close gallery overlay"
        className="absolute top-5 right-5 z-[90] font-headline text-2xl text-white transition-colors hover:text-[#ff1493]"
        onClick={closeOverlay}
        type="button"
      >
        ×
      </button>

      {items.length > 1 ? (
        <>
          <button
            aria-label="Previous item"
            className="absolute left-4 top-1/2 z-[90] -translate-y-1/2 font-headline text-4xl text-[#ff1493] transition-transform hover:scale-110"
            onClick={openPrev}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="Next item"
            className="absolute right-4 top-1/2 z-[90] -translate-y-1/2 font-headline text-4xl text-[#ff1493] transition-transform hover:scale-110"
            onClick={openNext}
            type="button"
          >
            ›
          </button>
        </>
      ) : null}

      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-16">
        <div className="relative flex max-h-[90vh] w-full max-w-[90vw] items-center justify-center overflow-hidden bg-black">
          {hasVideo ? (
            <video
              autoPlay
              className="max-h-[90vh] max-w-[90vw] object-contain"
              controls
              playsInline
              src={videoSource ?? undefined}
            />
          ) : imageUrl ? (
            <div className="relative h-[80vh] w-full max-w-[90vw]">
              <Image
                alt={activeItem.title || 'Gallery image'}
                className="object-contain"
                fill
                sizes="90vw"
                src={imageUrl}
              />
            </div>
          ) : null}
        </div>

        <div className="w-full max-w-[90vw] text-center">
          {activeItem.title ? (
            <h3 className="font-headline text-lg font-bold text-[#f0e8ff] sm:text-xl">{activeItem.title}</h3>
          ) : null}
          {metadata ? (
            <p className="mt-2 font-body text-sm text-[#6b6b8d]">{metadata}</p>
          ) : null}
          {hasVideo && activeItem.instagramUrl ? (
            <a
              className="mt-3 inline-block font-body text-sm text-[#ff1493] transition-opacity hover:opacity-80"
              href={activeItem.instagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              View original on Instagram ↗
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function GalleryCard({
  item,
  isActive,
  isPinned,
  setActiveVideoId,
  setPinnedVideoId,
  onOpen,
}: {
  item: NonNullable<GalleryItem>
  isActive: boolean
  isPinned: boolean
  setActiveVideoId: Dispatch<SetStateAction<string | null>>
  setPinnedVideoId: Dispatch<SetStateAction<string | null>>
  onOpen: () => void
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasVideo = Boolean(getVideoSource(item))
  const instagramEmbedUrl = !item.videoFile?.asset?.url ? getInstagramEmbedUrl(item.videoUrl) : null
  const isInstagramOnly = Boolean(item.instagramUrl) && !hasVideo && !item.image
  const isRotated = item.videoOrientation === 'vertical' && item.isRotatedPhoneVideo

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const startHover = () => {
    if (!hasVideo) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setActiveVideoId(item._id), 180)
  }

  const stopHover = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (instagramEmbedUrl && !isPinned) {
      setActiveVideoId((current) => (current === item._id ? null : current))
    }
  }

  return (
    <div
      className="masonry-item block w-full cursor-pointer text-left"
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
    >
      <article className="group relative overflow-hidden border border-[#1a1a1a] bg-black">
        <div
          className="absolute inset-0 z-[2] opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />

        <div className={`relative overflow-hidden bg-black ${getGalleryAspectClass(item.aspectRatio)}`}>
          {hasVideo ? (
            item.videoFile?.asset?.url ? (
              isRotated ? (
                <>
                  <div className="absolute left-3 top-3 z-[4] bg-[rgba(0,0,0,0.6)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6b6b8d]">
                    Rotated
                  </div>
                  <div
                    className={`absolute left-1/2 top-1/2 h-[56.25%] w-[177.78%] -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] transition-[transform,filter] duration-500 ease-out ${
                      isActive ? '' : 'group-hover:scale-[1.04] group-hover:brightness-[0.45]'
                    }`}
                  >
                    <video
                      autoPlay={isActive}
                      className="h-full w-full object-cover"
                      controls={false}
                      loop={false}
                      muted
                      onEnded={() => setActiveVideoId((current) => (current === item._id ? null : current))}
                      playsInline
                      preload="metadata"
                      src={getVideoSource(item) ?? undefined}
                    />
                  </div>
                </>
              ) : (
                <video
                  autoPlay={isActive}
                  className={`h-full w-full object-cover transition-[transform,filter] duration-500 ease-out ${
                    isActive ? '' : 'group-hover:scale-[1.04] group-hover:brightness-[0.45]'
                  }`}
                  controls={false}
                  loop={false}
                  muted
                  onEnded={() => setActiveVideoId((current) => (current === item._id ? null : current))}
                  playsInline
                  poster={item.image ? urlFor(item.image).url() : undefined}
                  preload="metadata"
                  src={getVideoSource(item) ?? undefined}
                />
              )
            ) : isActive && instagramEmbedUrl ? (
              <div className="relative z-[6] h-full w-full">
                <iframe
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={instagramEmbedUrl}
                  title={item.title || 'Instagram reel'}
                />
              </div>
            ) : item.image ? (
              <Image
                alt={item.title || 'Gallery item'}
                className="h-full w-full object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[0.45]"
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                src={urlFor(item.image).url()}
              />
            ) : isRotated ? (
              <>
                <div className="absolute left-3 top-3 z-[4] bg-[rgba(0,0,0,0.6)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6b6b8d]">
                  Rotated
                </div>
                <div className="absolute left-1/2 top-1/2 h-[56.25%] w-[177.78%] -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] bg-[#0e0e1a]" />
              </>
            ) : (
              <div className="h-full w-full bg-[#0e0e1a]" />
            )
          ) : item.image ? (
            <Image
              alt={item.title || 'Gallery item'}
              className="h-full w-full object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[0.45]"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              src={urlFor(item.image).url()}
            />
          ) : (
            <div className="h-full w-full bg-[#0e0e1a]" />
          )}

          <div className={`pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(to_top,rgba(5,5,16,0.95)_0%,rgba(5,5,16,0.5)_40%,transparent_70%)] transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
          <div className={`pointer-events-none absolute inset-0 z-[3] transition-shadow duration-200 ${isActive ? 'shadow-none' : 'shadow-[inset_0_0_0_0_#ff1493] group-hover:shadow-[inset_0_0_0_2px_#ff1493]'}`} />

          {!isActive ? (
            <button
              aria-label={hasVideo ? `Play ${item.title || 'reel'}` : `Open ${item.title || 'image'}`}
              className="absolute inset-0 z-[5]"
              onClick={onOpen}
              type="button"
            />
          ) : null}

          {isInstagramOnly ? (
            <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-3xl text-white">◎</span>
              <span className="font-body text-[11px] font-medium tracking-[0.18em] text-white">
                VIEW ON INSTAGRAM
              </span>
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] flex items-end justify-between gap-3 p-4">
            <h3 className="translate-y-[6px] font-headline text-base font-bold text-[#f0e8ff] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.title || 'Untitled Frame'}
            </h3>
            <span className={`translate-y-[6px] px-3 py-1 font-comic text-[14px] tracking-[0.05em] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${getTypeBadgeClass(item.type)}`}>
              {getTypeLabel(item.type)}
            </span>
          </div>
        </div>
      </article>
      {hasVideo && isPinned ? (
        <button
          className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6b8d] transition-colors hover:text-[#ff1493]"
          onClick={() => {
            setPinnedVideoId(null)
            setActiveVideoId(null)
          }}
          type="button"
        >
          Close Reel
        </button>
      ) : null}
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
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [pinnedVideoId, setPinnedVideoId] = useState<string | null>(null)

  const filteredItems = useMemo(
    () => safeItems.filter((item) => matchesFilter(item.type, activeFilter)),
    [activeFilter, safeItems]
  )

  const instagramUrl = settings?.instagramUrl || settings?.falconInstagram || null
  const handle = getInstagramHandle(instagramUrl)

  const closeOverlay = () => setActiveIndex(null)
  const openPrev = () => setActiveIndex((current) => (current === null ? null : (current - 1 + filteredItems.length) % filteredItems.length))
  const openNext = () => setActiveIndex((current) => (current === null ? null : (current + 1) % filteredItems.length))

  const openItem = (index: number) => {
    const item = filteredItems[index]
    if (!item) return

    const hasVideo = Boolean(getVideoSource(item))
    const hasImage = Boolean(item.image)

    if (!hasVideo && !hasImage && item.instagramUrl) {
      window.open(item.instagramUrl, '_blank', 'noopener,noreferrer')
      return
    }

    if (hasVideo) {
      setPinnedVideoId((current) => (current === item._id ? null : item._id))
      setActiveVideoId(item._id)
      return
    }

    setActiveIndex(index)
  }

  return (
    <section className="gallery-bg relative overflow-hidden pt-28 pb-24 text-[#f0e8ff]">
      <div className="fixed inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.045]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,20,147,0.025) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="section-shell relative z-10">
        <header className="mb-8">
          <div className="inline-block bg-[#ffd700] px-5 py-2 [transform:rotate(-2deg)] [box-shadow:4px_4px_0_#000]">
            <h1 className="font-comic text-[2.5rem] leading-none text-black">SHOT BY FALCON</h1>
          </div>
          <p className="mt-6 font-display text-[1.1rem] italic text-[#6b6b8d]">
            Photography · Cinematography · Visual Storytelling
          </p>
        </header>

        <nav className="flex flex-wrap gap-3 pb-6">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.key

            return (
              <button
                key={filter.key}
                className={
                  active
                    ? 'bg-[#ff1493] px-[18px] py-[6px] font-comic text-[1.1rem] tracking-[0.05em] text-black shadow-[3px_3px_0_#000]'
                    : 'border-2 border-[rgba(255,20,147,0.4)] bg-transparent px-[18px] py-[6px] font-comic text-[1.1rem] tracking-[0.05em] text-[rgba(255,255,255,0.5)] transition-colors hover:border-[#ff1493] hover:text-white'
                }
                onClick={() => setActiveFilter(filter.key)}
                type="button"
              >
                {filter.label}
              </button>
            )
          })}
        </nav>

        <div className="mb-6 h-px bg-[linear-gradient(to_right,#ff1493,transparent)]" />

        {safeItems.length === 0 ? (
          <GallerySkeleton />
        ) : filteredItems.length > 0 ? (
          <div className="masonry">
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={item._id}
                isActive={activeVideoId === item._id}
                isPinned={pinnedVideoId === item._id}
                item={item}
                setActiveVideoId={setActiveVideoId}
                setPinnedVideoId={setPinnedVideoId}
                onOpen={() => openItem(index)}
              />
            ))}
          </div>
        ) : (
          <GallerySkeleton />
        )}

        {instagramUrl && handle ? (
          <div className="py-[48px] text-center">
            <a
              className="font-body text-[15px] font-medium text-[#ff1493] transition-opacity hover:opacity-80"
              href={instagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              Follow the lens → {handle}
            </a>
          </div>
        ) : null}

        <div className="absolute left-0 bottom-0 font-mono text-[11px] tracking-[0.12em] text-[rgba(255,255,255,0.3)]">
          PAGE 07
        </div>
      </div>

      <GalleryOverlay
        activeIndex={activeIndex}
        closeOverlay={closeOverlay}
        items={filteredItems}
        openNext={openNext}
        openPrev={openPrev}
      />
    </section>
  )
}
