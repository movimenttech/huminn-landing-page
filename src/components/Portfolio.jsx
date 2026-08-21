import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import PortfolioModal from './PortfolioModal'
import { projects } from '../data/projects'

function getCenteredIndex(container, cards) {
  const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2
  let closest = 0
  let closestDist = Infinity
  cards.forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    const dist = Math.abs(rect.left + rect.width / 2 - containerCenter)
    if (dist < closestDist) {
      closestDist = dist
      closest = i
    }
  })
  return closest
}

function Arrow({ direction, onClick }) {
  const isLeft = direction === 'left'
  return (
    <button
      type="button"
      aria-label={isLeft ? 'Projeto anterior' : 'Próximo projeto'}
      onClick={onClick}
      className={`absolute inset-y-0 ${isLeft ? 'left-0' : 'right-0'} z-10 w-[clamp(48px,12.9vw,248px)] flex items-center ${
        isLeft ? 'justify-start pl-4 md:pl-12 bg-gradient-to-r' : 'justify-end pr-4 md:pr-12 bg-gradient-to-l'
      } from-black/60 to-transparent`}
    >
      <svg
        viewBox="0 0 56 35"
        className={`h-4 w-7 md:h-6 md:w-12 ${isLeft ? 'rotate-90' : '-rotate-90'}`}
        fill="none"
      >
        <path
          d="M28,34.82,0,0,28,34.82,56,0"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="6"
        />
      </svg>
    </button>
  )
}

const AUTO_SCROLL_SPEED = 1 // px per frame — slow, ambient drift

export default function Portfolio() {
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const isPausedRef = useRef(false)
  const directionRef = useRef(1)
  const [openIndex, setOpenIndex] = useState(null)

  const cards = () => cardRefs.current.filter(Boolean)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let rafId
    let position = track.scrollLeft
    const step = () => {
      if (isPausedRef.current) {
        // stay in sync with any manual scroll that happened while paused
        position = track.scrollLeft
      } else {
        const max = track.scrollWidth - track.clientWidth
        if (max > 0) {
          position += AUTO_SCROLL_SPEED * directionRef.current
          if (position >= max) {
            position = max
            directionRef.current = -1
          } else if (position <= 0) {
            position = 0
            directionRef.current = 1
          }
          track.scrollLeft = position
        }
      }
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const scrollToIndex = (i) => {
    const target = (i + projects.length) % projects.length
    cardRefs.current[target]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  const handleArrow = (delta) => {
    const centered = getCenteredIndex(trackRef.current, cards())
    scrollToIndex(centered + delta)
  }

  const handleCardClick = (i) => {
    const centered = getCenteredIndex(trackRef.current, cards())
    if (centered === i) {
      setOpenIndex(i)
    } else {
      scrollToIndex(i)
    }
  }

  return (
    <section id="nossos-trabalhos" className="relative bg-black py-[clamp(56px,4.7vw,90px)]">
      <div className="max-w-[1920px] mx-auto">
        <ScrollReveal
          as="span"
          className="block font-space text-huminn-purple text-[clamp(18px,2.08vw,40px)] px-[clamp(24px,12.9vw,248px)] mb-[clamp(24px,3.3vw,64px)]"
        >
          NOSSOS TRABALHOS
        </ScrollReveal>

        <div
          className="relative"
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
          onTouchStart={() => (isPausedRef.current = true)}
          onTouchEnd={() => (isPausedRef.current = false)}
        >
          <div
            ref={trackRef}
            className="no-scrollbar flex overflow-x-auto gap-[clamp(16px,5.47vw,105px)] px-[calc(50%-clamp(110px,18.6vw,357px))]"
          >
            {projects.map((project, i) => (
              <button
                key={project.id}
                ref={(el) => (cardRefs.current[i] = el)}
                type="button"
                onClick={() => handleCardClick(i)}
                className="group shrink-0 w-[clamp(220px,37.2vw,714px)] text-left"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={project.cardImage}
                    alt={project.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                  {project.cardImageHover && (
                    <img
                      src={project.cardImageHover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      draggable={false}
                    />
                  )}
                </div>
                <div className="mt-[clamp(16px,2.08vw,32px)]">
                  <p className="font-space text-huminn-purple text-[clamp(16px,2.08vw,40px)]">
                    {project.name}
                  </p>
                  <p className="font-space text-white text-[clamp(7px,0.9vw,17px)] leading-tight line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <Arrow direction="left" onClick={() => handleArrow(-1)} />
          <Arrow direction="right" onClick={() => handleArrow(1)} />
        </div>
      </div>

      <PortfolioModal
        project={openIndex !== null ? projects[openIndex] : null}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex((i) => (i - 1 + projects.length) % projects.length)}
        onNext={() => setOpenIndex((i) => (i + 1) % projects.length)}
      />
    </section>
  )
}
