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

const AUTO_SCROLL_SPEED = 1 // px per frame — slow, ambient drift
// Rendered twice back-to-back so the loop can wrap seamlessly: once the
// track scrolls past one full set, we subtract that set's width and land
// on the pixel-identical spot in the second copy — no visible jump, no
// reversing direction (unlike the old ping-pong behavior).
const TRACK_ITEMS = [...projects, ...projects]

export default function Portfolio() {
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const isPausedRef = useRef(false)
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
        const singleSetWidth = track.scrollWidth / 2
        if (singleSetWidth > 0) {
          position += AUTO_SCROLL_SPEED
          if (position >= singleSetWidth) {
            position -= singleSetWidth
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
    const target = (i + TRACK_ITEMS.length) % TRACK_ITEMS.length
    cardRefs.current[target]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  const handleCardClick = (i) => {
    const centered = getCenteredIndex(trackRef.current, cards())
    if (centered === i) {
      setOpenIndex(i % projects.length)
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
            {TRACK_ITEMS.map((project, i) => (
              <button
                key={`${project.id}-${i}`}
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
        </div>
      </div>

      <PortfolioModal
        project={openIndex !== null ? projects[openIndex] : null}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}
