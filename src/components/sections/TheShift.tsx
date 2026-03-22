import Image from 'next/image'

import { SITE } from '../../../constants/site'
import milesWallpaper from '../../../assets/wp7564649-miles-morales-into-the-spider-verse-wallpapers.png'

export default function TheShift() {
  return (
    <section className="relative z-[60] h-screen w-full overflow-hidden" id="the-shift">
      <Image
        alt="Miles Morales falling between two dimensions"
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src={milesWallpaper}
      />
      <div className="absolute inset-0 bg-[rgba(5,5,16,0.48)]" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="flex w-full max-w-5xl flex-col items-center justify-start pt-[6vh] md:pt-[10vh]">
          <div className="bg-tertiary px-8 py-3" style={{ transform: 'rotate(-2deg)', boxShadow: '4px 4px 0 #000' }}>
            <h2 className="font-comic text-[24px] tracking-[0.08em] text-black uppercase sm:text-[30px] md:text-[40px]">
              BUT WHEN THE SUN SETS...
            </h2>
          </div>

          <p className="mt-8 max-w-4xl font-display text-[1.9rem] font-bold italic leading-tight text-[rgba(240,232,255,0.9)] md:text-[2.5rem]">
            Hand him a camera, and he becomes
          </p>

          <h1
            className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] font-bold italic tracking-tight text-primary-container"
            style={{ filter: 'drop-shadow(0 0 25px #ff1493) drop-shadow(0 0 50px rgba(255,20,147,0.4))' }}
          >
            {SITE.alias}
          </h1>
        </div>
      </div>
    </section>
  )
}
