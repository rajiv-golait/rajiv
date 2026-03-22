"use client";

import { useMemo, useState } from 'react'
import Image from 'next/image'

import { getPortableTextPreview, getProjectCategories, titleCaseCategory } from '@/lib/portfolio'
import { urlFor } from '@/lib/sanity'

type Project = {
  _id: string
  title?: string | null
  tagline?: string | null
  description?: Array<{ children?: Array<{ text?: string | null } | null> } | null> | null
  thumbnail?: unknown
  architectureDiagram?: unknown
  techStack?: string[] | null
  category?: string | null
  githubUrl?: string | null
  liveUrl?: string | null
  isFeatured?: boolean | null
} | null

function ArchitectureFallback() {
  return (
    <svg className="h-full w-full" viewBox="0 0 400 300">
      <rect fill="none" height="60" stroke="#ff1493" strokeWidth="2" width="80" x="50" y="50" />
      <text fill="#ff1493" fontFamily="monospace" fontSize="10" x="65" y="85">INPUT</text>
      <rect fill="none" height="40" stroke="#4d2dff" strokeWidth="2" width="100" x="200" y="50" />
      <text fill="#4d2dff" fontFamily="monospace" fontSize="10" x="215" y="75">PROCESS</text>
      <rect fill="none" height="70" stroke="#ff1493" strokeWidth="2" width="120" x="120" y="180" />
      <text fill="#ff1493" fontFamily="monospace" fontSize="10" x="130" y="210">MODEL</text>
      <path d="M90 110 Q100 150 120 180" fill="none" stroke="#ff1493" strokeWidth="2" />
      <path d="M250 90 Q240 140 220 180" fill="none" stroke="#4d2dff" strokeWidth="2" />
      <text fill="#e3e0f3" fontFamily="monospace" fontSize="10" x="315" y="200">OUTPUT</text>
    </svg>
  )
}

function ProjectSkeleton() {
  return (
    <>
      <div className="comic-card mb-16 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="spider-skeleton h-80 w-full lg:h-auto lg:w-[55%]" />
          <div className="space-y-4 p-10 lg:w-[45%]">
            <div className="spider-skeleton h-8 w-3/4" />
            <div className="spider-skeleton h-5 w-full" />
            <div className="spider-skeleton h-5 w-5/6" />
            <div className="flex flex-wrap gap-2 pt-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="spider-skeleton h-7 w-20" />
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <div className="spider-skeleton h-11 w-36" />
              <div className="spider-skeleton h-11 w-36" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="comic-card p-6">
            <div className="spider-skeleton h-7 w-3/4" />
            <div className="mt-4 space-y-2">
              <div className="spider-skeleton h-4 w-full" />
              <div className="spider-skeleton h-4 w-5/6" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {[0, 1, 2].map((chip) => (
                <div key={chip} className="spider-skeleton h-6 w-16" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function Projects({
  projects,
  featured,
}: {
  projects: Project[] | null
  featured: Project | null
}) {
  const [filter, setFilter] = useState('all')
  const safeProjects = useMemo(() => (projects ?? []).filter(Boolean) as NonNullable<Project>[], [projects])
  const categories = getProjectCategories(safeProjects)
  const featuredProject = (featured && featured.isFeatured ? featured : safeProjects.find((item) => item.isFeatured)) ?? safeProjects[0] ?? null
  const gridProjects = safeProjects.filter((item) => item._id !== featuredProject?._id)
  const filteredProjects = filter === 'all' ? gridProjects : gridProjects.filter((item) => item.category === filter)
  const hasProjects = safeProjects.length > 0

  return (
    <section className="eng-bg relative py-[100px]" id="projects">
      <div className="section-shell relative">
        <div className="relative mb-16">
          <div className="absolute -right-4 -top-10 z-10 hidden rotate-12 bg-secondary-container p-4 shadow-[3px_3px_0_0_#ffd700] md:block">
            <span className="font-comic text-3xl tracking-widest text-tertiary">BZZT!</span>
          </div>
          <div className="mb-6 inline-block bg-tertiary px-5 py-2 tilted-caption sm:px-6">
            <h2 className="font-comic text-[28px] tracking-wider text-[#1a1a1a] sm:text-3xl">WHAT I BUILD</h2>
          </div>
          <p className="max-w-md border-l-4 border-primary-container pl-4 font-medium text-on-background/70">
            Problems I found interesting enough to actually solve.
          </p>
        </div>

        {hasProjects ? (
          <>
            <div className="mb-16 flex flex-wrap gap-3 sm:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={filter === category
                    ? 'bg-primary-container px-4 py-2 font-comic text-lg tracking-wide text-background hard-shadow-blue sm:px-6 sm:text-xl'
                    : 'border-2 border-primary-container bg-transparent px-4 py-2 font-comic text-lg tracking-wide text-primary-container transition-colors hover:bg-primary-container/10 sm:px-6 sm:text-xl'}
                  onClick={() => setFilter(category)}
                  type="button"
                >
                  {category === 'all' ? 'ALL' : titleCaseCategory(category).toUpperCase()}
                </button>
              ))}
            </div>

            {featuredProject ? (
              <article className="comic-card mb-16 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-background p-6 sm:h-80 sm:p-12 lg:h-auto lg:w-[55%]">
                    {featuredProject.category ? (
                      <div className="absolute left-4 top-4 z-10 bg-primary-container px-3 py-1 font-comic text-sm text-white">
                        {titleCaseCategory(featuredProject.category).toUpperCase()}
                      </div>
                    ) : null}
                    <div className="relative h-full w-full border border-primary-container/20 opacity-90">
                      {featuredProject.architectureDiagram ? (
                        <Image
                          alt={featuredProject.title || 'Architecture diagram'}
                          className="h-full w-full object-contain"
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          src={urlFor(featuredProject.architectureDiagram).url()}
                        />
                      ) : (
                        <ArchitectureFallback />
                      )}
                    </div>
                  </div>
                  <div className="flex w-full flex-col justify-center p-10 lg:w-[45%]">
                    <h3 className="mb-2 font-headline text-[24px] font-bold uppercase tracking-tight text-primary-container sm:text-[28px]">
                      {featuredProject.title || 'Untitled Project'}
                    </h3>
                    <p className="mb-4 text-base font-semibold text-on-background sm:text-lg">
                      {featuredProject.tagline || getPortableTextPreview(featuredProject.description) || 'Project details incoming.'}
                    </p>
                    {featuredProject.techStack?.length ? (
                      <div className="mb-8 flex flex-wrap gap-2">
                        {featuredProject.techStack.map((tech) => (
                          <span key={tech} className="border border-primary-container/20 bg-primary-container/10 px-2 py-1 font-mono text-[10px] uppercase text-primary-container">
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="flex flex-wrap gap-4">
                      {featuredProject.liveUrl ? (
                        <a className="bg-primary-container px-8 py-3 text-xs font-black uppercase tracking-[0.24em] text-white hard-shadow-blue" href={featuredProject.liveUrl} rel="noreferrer" target="_blank">
                          View Project
                        </a>
                      ) : null}
                      {featuredProject.githubUrl ? (
                        <a className="border-2 border-primary-container px-8 py-3 text-xs font-black uppercase tracking-[0.24em] text-on-background transition-colors hover:bg-primary-container/10" href={featuredProject.githubUrl} rel="noreferrer" target="_blank">
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ) : null}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.length > 0 ? filteredProjects.map((project) => (
                <article key={project._id} className="comic-card p-6 transition-transform hover:-translate-y-2 subtle-glow-pink">
                  {project.thumbnail ? (
                    <div className="relative mb-5 aspect-[4/3] overflow-hidden border border-primary-container/20">
                      <Image
                        alt={project.title || 'Project thumbnail'}
                        className="h-full w-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        src={urlFor(project.thumbnail).url()}
                      />
                    </div>
                  ) : null}
                  <h4 className="mb-3 font-headline text-xl font-bold uppercase text-primary-container">
                    {project.title || 'Untitled Project'}
                  </h4>
                  <p className="mb-6 min-h-12 text-sm text-on-background/70">
                    {project.tagline || getPortableTextPreview(project.description) || 'Project details incoming.'}
                  </p>
                  {project.techStack?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="border border-primary-container/30 px-2 py-1 font-mono text-[9px] uppercase text-primary-container">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              )) : (
                <div className="comic-card p-8 md:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-on-background/55">
                    No projects in this filter yet.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <ProjectSkeleton />
        )}
      </div>
    </section>
  )
}
