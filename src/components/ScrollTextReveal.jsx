import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const BASE_OPACITY = 0.2

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [BASE_OPACITY, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">
      {children}
    </motion.span>
  )
}

/**
 * Renders `paragraphs` dimmed, then brightens each word to full opacity in
 * reading order as the block scrolls through the viewport — no layout
 * animation, just an opacity ramp driven directly by scroll position.
 */
export default function ScrollTextReveal({ paragraphs, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const words = paragraphs.flatMap((text) => text.split(' '))
  const total = words.length
  let wordIndex = 0

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((text, pi) => (
        <p key={pi}>
          {text.split(' ').map((word) => {
            const i = wordIndex++
            const start = i / total
            const end = Math.min(start + 1.5 / total, 1)
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </p>
      ))}
    </div>
  )
}
