import { SITE } from '../../../constants/site'
import { formatYear } from '@/lib/portfolio'

type ExperienceItem = {
  _id: string
  company?: string | null
  role?: string | null
  startDate?: string | null
  endDate?: string | null
  description?: string | null
  techTags?: string[] | null
} | null

type Settings = {
  cgpa?: number | null
} | null

const educationHistory = [
  {
    title: 'Higher Secondary Education',
    place: 'S.R. Patil Jr. College',
    years: '2021 - 2023',
    location: 'Akola, India',
    scoreLabel: 'HSC',
    scoreValue: '72%',
  },
  {
    title: 'Secondary School Education',
    place: 'S.S.G.M.E.S.',
    years: '2020 - 2021',
    location: 'Shegaon, India',
    scoreLabel: 'SSC',
    scoreValue: '94%',
  },
] as const

function ExperienceSkeleton() {
  return (
    <div className="space-y-12">
      {[0, 1].map((item) => (
        <div key={item} className="relative">
          <div className="absolute -left-10 top-2 h-4 w-4 rounded-full bg-primary-container border-4 border-background" />
          <div className="comic-card p-6">
            <div className="mb-4 flex justify-between gap-4">
              <div className="space-y-2">
                <div className="spider-skeleton h-7 w-52" />
                <div className="spider-skeleton h-4 w-32" />
              </div>
              <div className="spider-skeleton h-6 w-16" />
            </div>
            <div className="space-y-2">
              <div className="spider-skeleton h-4 w-full" />
              <div className="spider-skeleton h-4 w-5/6" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {[0, 1, 2].map((chip) => (
                <div key={chip} className="spider-skeleton h-6 w-16" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Experience({
  experience,
  settings,
}: {
  experience: ExperienceItem[] | null
  settings: Settings
}) {
  const safeExperience = (experience ?? []).filter(Boolean) as NonNullable<ExperienceItem>[]

  return (
    <section className="eng-bg relative py-[100px]" id="experience">
      <div className="section-shell relative">
        <div className="mb-16">
          <div className="mb-6 inline-block bg-tertiary px-6 py-2 tilted-caption">
            <span className="font-comic text-4xl uppercase tracking-wider text-[#1a1a1a]">PROOF OF WORK</span>
          </div>
          <p className="ml-2 font-mono text-xs tracking-tight text-on-background/50">Field log. Kept tight.</p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-10 flex items-center gap-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-primary-container">FIELD LOG</span>
              <div className="h-px flex-1 bg-gradient-to-r from-primary-container/30 to-transparent" />
            </div>

            <div className="relative ml-2 space-y-12 border-l-2 border-secondary-container pl-8">
              {safeExperience.length > 0 ? (
                safeExperience.map((item) => (
                  <article key={item._id} className="relative group">
                    <div className="absolute -left-10 top-2 h-4 w-4 rounded-full bg-primary-container border-4 border-background shadow-[0_0_10px_rgba(255,20,147,0.55)]" />
                    <div className="comic-card p-6 transition-transform hover:-translate-y-1 subtle-glow-pink">
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-headline text-2xl font-black uppercase leading-none text-on-background">
                            {item.company || 'Experience'}
                          </h3>
                          {item.role ? (
                            <p className="mt-1 font-mono text-xs font-bold text-primary-container">{item.role}</p>
                          ) : null}
                        </div>
                        <span className="bg-background px-2 py-1 font-mono text-[10px] uppercase text-on-background/55">
                          {formatYear(item.startDate) || 'Year'}
                          {' - '}
                          {item.endDate ? formatYear(item.endDate) : <span className="text-primary-container">Present</span>}
                        </span>
                      </div>
                      {item.description ? (
                        <p className="mb-6 text-sm leading-relaxed text-on-background/75">{item.description}</p>
                      ) : null}
                      {item.techTags?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {item.techTags.map((tag) => (
                            <span key={tag} className="border border-primary-container/30 px-2 py-1 font-mono text-[10px] uppercase text-primary-container">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))
              ) : (
                <ExperienceSkeleton />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <article className="comic-card relative w-full max-w-lg border-[3px] border-secondary-container bg-surface p-6 subtle-glow-blue md:p-8">
              <div className="mx-auto mb-5 flex h-14 w-14 rotate-45 items-center justify-center border-2 border-secondary-container bg-secondary-container/20">
                <span className="material-symbols-outlined -rotate-45 text-2xl text-secondary">school</span>
              </div>
              <h3 className="mb-2 text-center font-headline text-xl font-black uppercase leading-tight text-on-background md:text-2xl">
                {SITE.college}
              </h3>
              <div className="mb-1 text-center font-mono text-sm font-bold text-secondary">{SITE.degree}</div>
              <div className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-on-background/40">
                Current - {SITE.collegeYears}
              </div>
              {typeof settings?.cgpa === 'number' ? (
                <div className="mt-6 text-center font-mono text-xs uppercase tracking-[0.24em] text-primary-container">
                  CGPA: {settings.cgpa.toFixed(2)}
                </div>
              ) : null}
            </article>

            <article className="comic-card w-full max-w-lg p-6 md:p-8">
              <h4 className="mb-6 font-headline text-2xl font-black uppercase tracking-tight text-primary-container">
                Education
              </h4>
              <div className="space-y-5">
                {educationHistory.map((item) => (
                  <div key={item.title} className="border-l-4 border-primary-container/40 pl-4">
                    <h5 className="font-headline text-lg font-black uppercase text-on-background">
                      {item.title}
                    </h5>
                    <div className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-secondary">
                      {item.place}
                    </div>
                    <div className="mt-2 text-sm text-on-background/70">
                      {item.years} · {item.location}
                    </div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-primary-container">
                      {item.scoreLabel}: {item.scoreValue}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
