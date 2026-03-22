"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function navClass(active: boolean) {
  return active
    ? 'font-headline text-xs font-bold uppercase tracking-[0.24em] text-primary-container'
    : 'font-headline text-xs font-bold uppercase tracking-[0.24em] text-on-background/70 transition-colors hover:text-primary-container'
}

export default function Nav() {
  const pathname = usePathname()
  const onGallery = pathname === '/gallery' || pathname.startsWith('/gallery/')
  const onHome = !onGallery

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link className="font-headline text-2xl font-black italic tracking-tighter uppercase text-primary-container" href="/">
          Rajiv
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link className={navClass(onHome)} href="/#projects">
            Projects
          </Link>
          <Link className={navClass(onHome)} href="/#experience">
            Experience
          </Link>
          <Link className={navClass(onGallery)} href="/gallery">
            Gallery
          </Link>
          <Link className={navClass(onHome)} href="/#contact">
            Contact
          </Link>
          <Link className="bg-primary-container px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white hard-shadow-blue transition-transform hover:translate-y-px" href={onGallery ? '/#contact' : '/#contact'}>
            Connect
          </Link>
        </nav>
        <button aria-label="Open navigation" className="md:hidden text-primary-container">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </header>
  )
}
