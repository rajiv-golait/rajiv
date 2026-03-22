import { SITE } from '../../../constants/site'

export default function Footer() {
  return (
    <footer className="section-shell mt-32 border-t border-white/5 py-12">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="font-headline text-xl font-black italic uppercase text-primary-container">Rajiv</div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-on-background/40">
          Copyright {new Date().getFullYear()} {SITE.name.toUpperCase()} {'//'} MULTIVERSAL ARCHITECT
        </p>
        <div className="flex gap-4">
          <div className="h-2 w-2 bg-primary-container" />
          <div className="h-2 w-2 bg-secondary-container" />
          <div className="h-2 w-2 bg-tertiary" />
        </div>
      </div>
    </footer>
  )
}
