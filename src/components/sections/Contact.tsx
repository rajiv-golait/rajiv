import { getResumeHref } from '@/lib/portfolio'

type Settings = {
  email?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  instagramUrl?: string | null
  falconInstagram?: string | null
  resumeUrl?: string | null
  resumeFile?: { asset?: { url?: string | null } | null } | null
} | null

function ContactSkeleton() {
  return (
    <>
      <div className="contact-card-glow comic-card w-full max-w-[600px] p-8 md:p-12">
        <div className="space-y-8">
          {[0, 1, 2].map((item) => (
            <div key={item} className="space-y-3">
              <div className="spider-skeleton h-4 w-40 border-0" />
              <div className="spider-skeleton h-12 w-full border-0" />
            </div>
          ))}
          <div className="spider-skeleton h-16 w-full border-0" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="spider-skeleton h-14 w-14 rounded-full" />
        ))}
      </div>
    </>
  )
}

export default function Contact({ settings }: { settings: Settings }) {
  const resumeHref = getResumeHref(settings)
  const socials = [
    { icon: 'code', href: settings?.githubUrl, tone: 'secondary' },
    { icon: 'groups', href: settings?.linkedinUrl, tone: 'secondary' },
    { icon: 'camera', href: settings?.instagramUrl, tone: 'primary' },
    { icon: 'play_circle', href: settings?.falconInstagram, tone: 'primary' },
    { icon: 'mail', href: settings?.email ? `mailto:${settings.email}` : null, tone: 'secondary-container' },
  ].filter((item) => Boolean(item.href))

  return (
    <section className="eng-bg relative flex flex-col items-center justify-center px-4 py-[80px] md:min-h-screen md:px-12 md:py-[100px]" id="contact">
      <div className="section-shell relative flex flex-col items-center">
        <div className="mb-12 text-center md:self-start md:text-left">
          <div className="mb-4 inline-block bg-tertiary px-4 py-1 tilted-caption">
            <span className="font-comic text-2xl uppercase text-[#1a1a1a]">COMMS RELAY</span>
          </div>
          <p className="max-w-lg font-headline text-xl font-black uppercase leading-tight tracking-tight text-on-background sm:text-2xl md:text-3xl">
            Whether it&apos;s code or camera work - let&apos;s build something together.
          </p>
        </div>

        {settings === null ? (
          <ContactSkeleton />
        ) : (
          <>
            <div className="contact-card-glow comic-card w-full max-w-[680px] bg-surface p-6 sm:p-8 md:p-12">
              {settings?.email ? (
                <form action={`mailto:${settings.email}`} className="space-y-8" encType="text/plain" method="post">
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-[0.24em] text-secondary">ALIAS</label>
                    <input className="spider-input w-full px-0 py-3 placeholder:text-surface-bright" name="name" placeholder="TYPE YOUR NAME..." type="text" />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-[0.24em] text-secondary">FREQUENCY (EMAIL)</label>
                    <input className="spider-input w-full px-0 py-3 placeholder:text-surface-bright" name="email" placeholder="YOUR@VIRTUAL.ADDRESS" type="email" />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-[0.24em] text-secondary">TRANSMISSION DATA</label>
                    <textarea className="spider-input w-full resize-none px-0 py-3 placeholder:text-surface-bright" name="message" placeholder="INITIATING ENCODING..." rows={4} />
                  </div>
                  <button className="w-full bg-tertiary py-4 font-comic text-3xl uppercase tracking-widest text-[#1a1a1a] shadow-[6px_6px_0_0_#4d2dff] transition-transform hover:translate-y-px" type="submit">
                    Send Transmission
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="font-mono text-xs uppercase tracking-[0.24em] text-secondary">COMMS CHANNEL OFFLINE</div>
                  <div className="spider-skeleton h-12 w-full border-0" />
                  <div className="spider-skeleton h-12 w-full border-0" />
                  <div className="spider-skeleton h-28 w-full border-0" />
                </div>
              )}
            </div>

            {(socials.length > 0 || resumeHref) ? (
              <div className="mt-12 flex w-full flex-col items-center gap-12">
                {socials.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-6">
                    {socials.map((social) => (
                      <a
                        key={`${social.icon}-${social.href}`}
                        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors ${
                          social.tone === 'primary'
                            ? 'border-primary text-primary hover:bg-primary hover:text-background'
                            : social.tone === 'secondary-container'
                              ? 'border-secondary-container text-secondary-container hover:bg-secondary-container hover:text-on-background'
                              : 'border-secondary text-secondary hover:bg-secondary hover:text-background'
                        }`}
                        href={social.href ?? undefined}
                        rel="noreferrer"
                        target={social.href?.startsWith('mailto:') ? undefined : '_blank'}
                      >
                        <span className="material-symbols-outlined text-3xl">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                ) : null}

                {resumeHref ? (
                  <a
                    className="inline-flex items-center gap-4 rounded-full border border-primary-container px-10 py-4 font-mono text-sm font-bold uppercase tracking-[0.24em] text-primary-container transition-colors hover:bg-primary-container hover:text-white"
                    href={resumeHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined">description</span>
                    Download Resume
                  </a>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
