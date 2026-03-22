"use client";

import { SITE } from '../../../constants/site'

type Skill = {
  _id: string
  name?: string | null
  zone?: string | null
  proficiency?: string | null
} | null

const zoneConfig = [
  { key: 'ai-ml', label: 'AI/ML ZONE', color: '#ff1493', center: { x: 18, y: 20 } },
  { key: 'data', label: 'DATA SCIENCE ZONE', color: '#4d2dff', center: { x: 82, y: 20 } },
  { key: 'etc', label: 'E&TC CORE ZONE', color: '#9b30ff', center: { x: 20, y: 76 } },
  { key: 'tools', label: 'TOOLS ZONE', color: '#6b6b8d', center: { x: 80, y: 76 } },
] as const

function getNodeSize(proficiency?: string | null) {
  switch (proficiency) {
    case 'built-with':
      return 'h-16 w-16'
    case 'comfortable':
      return 'h-12 w-12'
    case 'exploring':
    default:
      return 'h-10 w-10'
  }
}

function getOrbitOffset(index: number) {
  const ring = [
    { x: -10, y: -14 },
    { x: 10, y: -14 },
    { x: -14, y: 4 },
    { x: 14, y: 4 },
    { x: 0, y: 16 },
    { x: -18, y: 18 },
    { x: 18, y: 18 },
  ]

  return ring[index % ring.length]
}

function ArsenalSkeleton() {
  return (
    <div className="relative hidden h-[700px] overflow-hidden comic-card bg-background md:block">
      {zoneConfig.map((zone, zoneIndex) => (
        <div key={zone.key}>
          {[0, 1, 2, 3].map((item) => {
            const offset = getOrbitOffset(item)
            return (
              <div
                key={`${zone.key}-${item}`}
                className="spider-skeleton absolute rounded-full"
                style={{
                  left: `${zone.center.x + offset.x}%`,
                  top: `${zone.center.y + offset.y}%`,
                  width: item === 0 ? '4rem' : item < 3 ? '3rem' : '2.5rem',
                  height: item === 0 ? '4rem' : item < 3 ? '3rem' : '2.5rem',
                }}
              />
            )
          })}
          <div
            className="absolute -translate-x-1/2 font-comic text-xs uppercase tracking-[0.24em]"
            style={{ left: `${zone.center.x}%`, top: `${zone.center.y + 18}%`, color: zone.color }}
          >
            {zone.label}
          </div>
          {zoneIndex < zoneConfig.length - 1 ? null : (
            <div className="spider-skeleton absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          )}
        </div>
      ))}
    </div>
  )
}

function MobileArsenal({
  safeSkills,
}: {
  safeSkills: NonNullable<Skill>[]
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:hidden">
      {zoneConfig.map((zone) => {
        const zoneSkills = safeSkills.filter((skill) => skill.zone === zone.key)

        return (
          <article key={zone.key} className="comic-card p-5">
            <div className="mb-4 inline-flex border px-3 py-1 font-comic text-sm uppercase tracking-[0.24em]" style={{ color: zone.color, borderColor: `${zone.color}55` }}>
              {zone.label}
            </div>
            {zoneSkills.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {zoneSkills.map((skill) => (
                  <div
                    key={skill._id}
                    className={`flex items-center justify-center rounded-full border-2 bg-surface p-2 text-center ${getNodeSize(skill.proficiency)}`}
                    style={{
                      borderColor: zone.color,
                      boxShadow: skill.proficiency === 'built-with' ? `0 0 18px ${zone.color}55` : undefined,
                    }}
                  >
                    <span className="font-mono text-[9px] font-bold uppercase leading-none text-on-background">
                      {skill.name || 'Skill'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="spider-skeleton h-16 w-full border-0" />
            )}
          </article>
        )
      })}
    </div>
  )
}

export default function Arsenal({ skills = [] }: { skills?: Skill[] | null }) {
  const safeSkills = (skills ?? []).filter(Boolean) as NonNullable<Skill>[]

  return (
    <section className="eng-bg relative py-[100px]" id="arsenal">
      <div className="section-shell relative">
        <div className="mb-6 inline-block bg-tertiary px-6 py-2 tilted-caption">
          <h2 className="font-comic text-[28px] tracking-wider text-[#1a1a1a] uppercase sm:text-4xl">MY ARSENAL</h2>
        </div>
        <p className="mb-4 max-w-xl font-headline text-xl font-black leading-tight text-secondary uppercase sm:text-2xl">
          I don&apos;t collect tools. I pick what the problem needs.
        </p>
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-container sm:mb-20 sm:text-xs sm:tracking-[0.24em]">
          Currently exploring: {SITE.currentlyExploring}
        </p>

        {safeSkills.length === 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 md:hidden">
              {zoneConfig.map((zone) => (
                <div key={zone.key} className="comic-card p-5">
                  <div className="mb-4 inline-flex border px-3 py-1 font-comic text-sm uppercase tracking-[0.24em]" style={{ color: zone.color, borderColor: `${zone.color}55` }}>
                    {zone.label}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="spider-skeleton h-12 w-12 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <ArsenalSkeleton />
          </>
        ) : (
          <>
            <MobileArsenal safeSkills={safeSkills} />
            <div
              className="relative hidden h-[700px] overflow-hidden comic-card bg-background md:block"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(26,26,53,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,53,0.18) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            >
            <div className="pool-of-light absolute left-[10%] top-[10%] h-[320px] w-[320px] rounded-full bg-primary-container" />
            <div className="pool-of-light absolute right-[10%] top-[10%] h-[320px] w-[320px] rounded-full bg-secondary-container" />
            <div className="pool-of-light absolute bottom-[5%] left-[12%] h-[320px] w-[320px] rounded-full bg-purple-accent" />
            <div className="pool-of-light absolute bottom-[5%] right-[12%] h-[320px] w-[320px] rounded-full bg-muted-accent" />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
              {zoneConfig.map((zone) => {
                const zoneSkills = safeSkills.filter((skill) => skill.zone === zone.key)
                return zoneSkills.map((skill, index) => {
                  const offset = getOrbitOffset(index)
                  const nodeX = zone.center.x + offset.x
                  const nodeY = zone.center.y + offset.y

                  return (
                    <g key={`${zone.key}-${skill._id}`}>
                      <line stroke={zone.color} strokeDasharray="3 2" strokeOpacity="0.45" strokeWidth="0.4" x1={zone.center.x} x2={nodeX} y1={zone.center.y} y2={nodeY} />
                      <line stroke={zone.color} strokeDasharray="3 2" strokeOpacity="0.25" strokeWidth="0.4" x1="50" x2={zone.center.x} y1="50" y2={zone.center.y} />
                    </g>
                  )
                })
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-primary-container bg-background text-center subtle-glow-pink">
              <span className="font-headline text-sm font-black uppercase text-primary-container">
                CORE
                <br />
                LOGIC
              </span>
            </div>

            {zoneConfig.map((zone) => {
              const zoneSkills = safeSkills.filter((skill) => skill.zone === zone.key)

              return (
                <div key={zone.key}>
                  {zoneSkills.map((skill, index) => {
                    const offset = getOrbitOffset(index)
                    return (
                      <div
                        key={skill._id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-surface p-2 text-center ${getNodeSize(skill.proficiency)}`}
                        style={{
                          left: `${zone.center.x + offset.x}%`,
                          top: `${zone.center.y + offset.y}%`,
                          borderColor: zone.color,
                          boxShadow: skill.proficiency === 'built-with' ? `0 0 22px ${zone.color}66` : undefined,
                        }}
                      >
                        <span className="font-mono text-[9px] font-bold uppercase leading-none text-on-background">
                          {skill.name || 'Skill'}
                        </span>
                      </div>
                    )
                  })}

                  <div
                    className="absolute -translate-x-1/2 border px-3 py-1 font-comic text-xs uppercase tracking-[0.24em]"
                    style={{
                      left: `${zone.center.x}%`,
                      top: `${zone.center.y + 20}%`,
                      color: zone.color,
                      borderColor: `${zone.color}33`,
                      backgroundColor: 'rgba(5, 5, 16, 0.75)',
                    }}
                  >
                    {zone.label}
                  </div>
                </div>
              )
            })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
