import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Gallery from '@/components/sections/Gallery'
import { client } from '@/lib/sanity'
import { publishedGalleryQuery, siteSettingsQuery } from '@/lib/queries'

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([
    client.fetch(publishedGalleryQuery),
    client.fetch(siteSettingsQuery),
  ])

  return (
    <main className="min-h-screen bg-[#08070d] text-on-background">
      <Nav />
      <Gallery items={items} settings={settings} />
      <Footer />
    </main>
  )
}
