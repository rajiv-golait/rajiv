import Image from 'next/image'

import { formatMonthYear } from '@/lib/portfolio'
import { urlFor } from '@/lib/sanity'

type Certification = {
  _id: string
  title?: string | null
  issuer?: string | null
  issueDate?: string | null
  credentialUrl?: string | null
  badgeImage?: unknown
} | null

type Achievement = {
  _id: string
  title?: string | null
  event?: string | null
  position?: string | null
  description?: string | null
  isFeatured?: boolean | null
} | null

function CertColumnSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((item) => (
        <div key={item} className="comic-card flex items-center gap-4 p-4">
          <div className="spider-skeleton h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="spider-skeleton h-5 w-2/3" />
            <div className="spider-skeleton h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

function MissionsColumnSkeleton() {
  return (
    <div className="space-y-6">
      <div className="comic-card p-8">
        <div className="mb-4 flex justify-between gap-4">
          <div className="space-y-2">
            <div className="spider-skeleton h-8 w-64" />
            <div className="spider-skeleton h-4 w-32" />
          </div>
          <div className="skeleton-caption h-8 w-20" />
        </div>
        <div className="space-y-2">
          <div className="spider-skeleton h-4 w-full" />
          <div className="spider-skeleton h-4 w-5/6" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[0, 1].map((item) => (
          <div key={item} className="comic-card p-6">
            <div className="spider-skeleton h-7 w-40" />
            <div className="mt-3 space-y-2">
              <div className="spider-skeleton h-4 w-full" />
              <div className="spider-skeleton h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function IntelSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <CertColumnSkeleton />
      <MissionsColumnSkeleton />
    </div>
  )
}

export default function IntelMissions({
  certificates,
  achievements,
}: {
  certificates: Certification[] | null
  achievements: Achievement[] | null
}) {
  const safeCerts = (certificates ?? []).filter(Boolean) as NonNullable<Certification>[]
  const safeAchievements = (achievements ?? []).filter(Boolean) as NonNullable<Achievement>[]
  const featuredAchievement = safeAchievements.find((item) => item.isFeatured) ?? safeAchievements[0] ?? null
  const secondaryAchievements = safeAchievements.filter((item) => item._id !== featuredAchievement?._id)
  const hasContent = safeCerts.length > 0 || safeAchievements.length > 0

  return (
    <section className="eng-bg relative py-[100px]" id="certifications">
      <div className="section-shell relative">
        {hasContent ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="mb-4 inline-block self-start bg-tertiary px-6 py-2 tilted-caption">
                <span className="font-comic text-2xl uppercase tracking-widest text-[#1a1a1a]">VERIFIED INTEL</span>
              </div>
              <div className="space-y-4">
                {safeCerts.length > 0 ? safeCerts.map((cert) => (
                  <article key={cert._id} className="comic-card flex items-center gap-4 p-4 transition-transform hover:translate-x-2 subtle-glow-pink">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-primary-container bg-surface-container-highest">
                      {cert.badgeImage ? (
                        <Image alt={cert.title || 'Certification badge'} className="h-full w-full object-cover" height={64} src={urlFor(cert.badgeImage).url()} width={64} />
                      ) : (
                        <span className="material-symbols-outlined text-3xl text-primary-container">verified</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-headline text-lg font-bold uppercase">{cert.title || 'Certification'}</h3>
                      {cert.issuer ? <p className="font-mono text-sm text-secondary">{cert.issuer}</p> : null}
                      {cert.issueDate ? <p className="mt-1 text-xs uppercase text-on-background/55">Issued {formatMonthYear(cert.issueDate)}</p> : null}
                    </div>
                    {cert.credentialUrl ? (
                      <a className="flex flex-col items-center gap-1" href={cert.credentialUrl} rel="noreferrer" target="_blank">
                        <span className="material-symbols-outlined text-primary-container">north_east</span>
                        <span className="font-mono text-[10px] font-bold uppercase text-primary-container">Verify</span>
                      </a>
                    ) : null}
                  </article>
                )) : <CertColumnSkeleton />}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="mb-4 inline-block self-end bg-tertiary px-6 py-2" style={{ transform: 'rotate(2deg)', boxShadow: '3px 3px 0 #000' }}>
                <span className="font-comic text-2xl uppercase tracking-widest text-[#1a1a1a]">MISSIONS COMPLETED</span>
              </div>

              {featuredAchievement ? (
                <article className="comic-card relative overflow-hidden border-l-[6px] border-l-primary-container p-8 shadow-[0_0_40px_rgba(255,20,147,0.15)]">
                  <div className="absolute -right-10 -top-10 h-40 w-40 bg-primary-container/20 blur-3xl" />
                  <div className="relative z-10">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-headline text-4xl font-black italic uppercase leading-none text-primary-container title-stack">
                          {featuredAchievement.event || featuredAchievement.title || 'Achievement'}
                        </h2>
                        {featuredAchievement.title ? (
                          <p className="mt-2 font-mono text-sm text-secondary">{featuredAchievement.title}</p>
                        ) : null}
                      </div>
                      {featuredAchievement.position ? (
                        <div className="bg-primary-container px-4 py-1 text-on-background" style={{ transform: 'rotate(3deg)' }}>
                          <span className="font-comic text-xl uppercase">{featuredAchievement.position}</span>
                        </div>
                      ) : null}
                    </div>
                    {featuredAchievement.description ? (
                      <p className="max-w-md leading-relaxed text-on-background/80">{featuredAchievement.description}</p>
                    ) : null}
                  </div>
                </article>
              ) : <MissionsColumnSkeleton />}

              {featuredAchievement && secondaryAchievements.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {secondaryAchievements.map((achievement) => (
                    <article key={achievement._id} className="comic-card bg-surface-container-high p-6">
                      {achievement.position ? (
                        <span className="mb-3 inline-flex bg-tertiary px-3 py-1 font-comic text-lg uppercase text-[#1a1a1a]">
                          {achievement.position}
                        </span>
                      ) : null}
                      <h4 className="font-headline text-xl font-bold uppercase">
                        {achievement.event || achievement.title || 'Achievement'}
                      </h4>
                      {achievement.description ? (
                        <p className="mt-2 text-sm text-on-background/70">{achievement.description}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <IntelSkeleton />
        )}
      </div>
    </section>
  )
}
