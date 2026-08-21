import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const WHATSAPP_LINK =
  'https://wa.me/5519981066042?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.'

const NAV_ITEMS = [
  { label: 'A HUMINN', href: '#a-huminn' },
  { label: 'NOSSOS TRABALHOS', href: '#nossos-trabalhos' },
  { label: 'FALE COM A GENTE', href: '#fale-com-a-gente' },
]

function handleNavClick(e, href) {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      if (y <= 80) {
        setVisible(true)
      } else if (y > lastY.current + 4) {
        setVisible(true) // scrolling down: keep the bar available
      } else if (y < lastY.current - 4) {
        setVisible(false) // scrolling up: get out of the way
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: visible ? 0 : '-100%' }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="absolute inset-x-0 top-0 h-[clamp(90px,13.1vw,251px)] bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="relative max-w-[1920px] mx-auto flex items-center justify-between gap-4 px-[clamp(20px,12.9vw,248px)] py-[clamp(20px,4.27vw,82px)]">
        <a href="#top" className="shrink-0">
          <img
            src="/images/logo/logotipo-huminn-branco.png"
            alt="HUMINN"
            className="h-[clamp(28px,2.24vw,43px)] w-auto"
          />
        </a>

        <nav className="hidden lg:flex shrink-0 items-center gap-[clamp(12px,2.08vw,40px)] rounded-full bg-black px-[clamp(16px,2.08vw,40px)] h-[clamp(44px,3.28vw,63px)]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-space text-white text-[clamp(12px,1.25vw,24px)] uppercase tracking-wide whitespace-nowrap hover:opacity-70 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
          className="shrink-0 flex items-center justify-center h-[clamp(40px,2.92vw,56px)] w-[clamp(40px,2.92vw,56px)] rounded-full bg-black hover:opacity-80 transition-opacity"
        >
          <svg viewBox="0 0 33 33" className="h-[55%] w-[55%]" fill="#fff">
            <path d="M23.946,19.775c-.41-.2-2.419-1.192-2.793-1.33s-.646-.2-.92.206-1.055,1.328-1.292,1.6-.477.307-.885.1a11.218,11.218,0,0,1-3.286-2.028A12.3,12.3,0,0,1,12.5,15.5c-.238-.408-.026-.63.179-.833.184-.183.408-.477.613-.715a2.77,2.77,0,0,0,.408-.683.745.745,0,0,0-.034-.715c-.1-.2-.918-2.217-1.26-3.035-.331-.8-.668-.687-.918-.7S10.972,8.8,10.7,8.8a1.5,1.5,0,0,0-1.089.512,4.577,4.577,0,0,0-1.43,3.409,7.951,7.951,0,0,0,1.668,4.227c.2.272,2.881,4.4,6.979,6.17a23.346,23.346,0,0,0,2.329.859,5.579,5.579,0,0,0,2.574.162A4.212,4.212,0,0,0,24.49,22.2a3.425,3.425,0,0,0,.238-1.943c-.1-.17-.374-.272-.784-.477ZM16.49,29.954h-.006a13.573,13.573,0,0,1-6.921-1.9l-.493-.293-5.145,1.35L5.3,24.1l-.323-.514A13.591,13.591,0,1,1,16.49,29.954ZM28.057,4.8A16.356,16.356,0,0,0,2.32,24.526L0,33l8.668-2.274a16.336,16.336,0,0,0,7.816,1.991h.007A16.359,16.359,0,0,0,28.057,4.8" />
          </svg>
        </a>
      </div>
    </motion.header>
  )
}
