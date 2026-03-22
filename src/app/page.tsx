import { client } from '@/lib/sanity'
import * as queries from '@/lib/queries'

import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Arsenal from '@/components/sections/Arsenal'
import Experience from '@/components/sections/Experience'
import IntelMissions from '@/components/sections/IntelMissions'
import TheShift from '@/components/sections/TheShift'
import Contact from '@/components/sections/Contact'

export default async function Home() {
  const [
    projects,
    featuredProject,
    skills,
    experience,
    certs,
    achievements,
    settings
  ] = await Promise.all([
    client.fetch(queries.publishedProjectsQuery),
    client.fetch(queries.featuredProjectQuery),
    client.fetch(queries.skillsQuery),
    client.fetch(queries.experienceQuery),
    client.fetch(queries.certificationsQuery),
    client.fetch(queries.achievementsQuery),
    client.fetch(queries.siteSettingsQuery)
  ]);

  return (
    <main className="min-h-screen bg-background text-on-background eng-bg">
      <Nav />
      <Hero settings={settings} />
      <Projects projects={projects} featured={featuredProject} />
      <Arsenal skills={skills} />
      <Experience experience={experience} settings={settings} />
      <IntelMissions certificates={certs} achievements={achievements} />
      <TheShift />
      <Contact settings={settings} />
      <Footer />
    </main>
  )
}
