import Image from 'next/image'

import { SITE } from '../../../constants/site'
import { urlFor } from '@/lib/sanity'

type Settings = {
  bio?: string | null
  heroPortrait?: unknown
  portraitImage?: unknown
  githubUrl?: string | null
  linkedinUrl?: string | null
  instagramUrl?: string | null
  email?: string | null
} | null

const socialLinks = (settings: Settings) => [
  { icon: 'code', href: settings?.githubUrl, label: 'GitHub' },
  { icon: 'groups', href: settings?.linkedinUrl, label: 'LinkedIn' },
  { icon: 'photo_camera', href: settings?.instagramUrl, label: 'Instagram' },
  { icon: 'mail', href: settings?.email ? `mailto:${settings.email}` : null, label: 'Email' },
].filter((item) => Boolean(item.href))

export default function Hero({ settings }: { settings: Settings }) {
  const links = socialLinks(settings)
  const portraitAsset = settings?.heroPortrait || settings?.portraitImage || null
  const portraitSrc = portraitAsset ? urlFor(portraitAsset).url() : null

  return (
    <section className="eng-bg relative min-h-screen max-h-screen overflow-hidden pt-[80px]" id="hero">
      <div className="section-shell relative flex h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] flex-col justify-center gap-10 py-8 md:flex-row md:items-center md:gap-12 md:py-10">
        <div className="sfx-burst right-12 top-20 hidden scale-150 rotate-12 md:block">
          <svg fill="#ff1493" height="180" viewBox="0 0 200 200" width="180">
            <path d="M100 0L115 70L185 85L115 100L100 170L85 100L15 85L85 70Z" />
          </svg>
        </div>

        <div className="z-10 flex-1 space-y-6 text-center md:space-y-8 md:text-left">
          <div className="inline-flex bg-tertiary px-4 py-1 tilted-caption">
            <span className="font-comic text-lg tracking-wider text-[#1a1a1a]">HEY, I&apos;M</span>
          </div>

          <h1 className="font-headline text-[56px] font-black uppercase leading-none tracking-[-0.08em] text-primary-container title-stack sm:text-[72px] md:text-[124px]">
            {SITE.name.split(' ')[0]}
          </h1>

          <div className="space-y-1 text-base font-bold uppercase sm:text-[18px] md:text-[22px]">
            <p className="text-on-background">ENGINEER BY LOGIC.</p>
            <p>
              <span className="text-primary-container">{SITE.alias}</span>{' '}
              <span className="text-on-background">BY INSTINCT.</span>
            </p>
          </div>

          {settings === null ? (
            <div className="space-y-2">
              <div className="spider-skeleton h-4 w-72 max-w-full border-0" />
              <div className="spider-skeleton h-4 w-60 max-w-full border-0" />
              <div className="spider-skeleton h-4 w-52 max-w-full border-0" />
            </div>
          ) : settings?.bio ? (
            <p className="mx-auto max-w-md text-[15px] leading-relaxed text-on-background/60 md:mx-0">{settings.bio}</p>
          ) : null}

          {settings === null ? (
            <div className="flex justify-center gap-4 pt-4 md:justify-start">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="spider-skeleton h-10 w-10 rounded-full border-primary-container/30" />
              ))}
            </div>
          ) : links.length > 0 ? (
            <div className="flex justify-center gap-4 pt-4 md:justify-start">
              {links.map((link) => (
                <a
                  key={link.label}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-container bg-primary-container/10 text-primary-container transition-colors hover:bg-primary-container hover:text-white"
                  href={link.href ?? undefined}
                  rel="noreferrer"
                  target={link.href?.startsWith('mailto:') ? undefined : '_blank'}
                >
                  <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative z-10 flex flex-1 items-end">
          <div
            className="relative mx-auto h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] w-full max-w-sm overflow-hidden bg-[#0a0a14] sm:max-w-md md:max-w-lg"
            style={{
              border: '2px solid rgba(255,20,147,0.4)',
              borderRadius: '0px',
              boxShadow: '-30px 0 80px rgba(255,20,147,0.18), 30px 0 80px rgba(77,45,255,0.18)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-10"
              style={{
                inset: '-6px',
                border: '1px solid rgba(77,45,255,0.3)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[6px] left-[6px] z-10"
              style={{
                width: '40%',
                height: '40%',
                borderLeft: '2px solid rgba(255,20,147,0.6)',
                borderBottom: '2px solid rgba(255,20,147,0.6)',
              }}
            />
            {portraitSrc ? (
              <Image
                alt={`${SITE.name} portrait`}
                className="h-full w-full object-contain"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                src={portraitSrc}
                style={{ objectPosition: 'center bottom' }}
              />
            ) : (
              <div className="h-full w-full spider-skeleton border-0">
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a14]">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary-container/40 bg-primary-container/10">
                    <span className="material-symbols-outlined text-5xl text-primary-container/60">photo_camera</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
