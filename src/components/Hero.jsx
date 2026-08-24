import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { heroSequence } from '../data/heroSequence'

const SLIDE_DURATION = 4500

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSequence.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="top" className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-black">
      <AnimatePresence>
        <motion.div
          key={`${heroSequence[index]}-${index}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <motion.img
            src={heroSequence[index]}
            alt=""
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 bottom-10 md:bottom-16 flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 62 27" className="h-6 w-14 md:h-7 md:w-16" fill="none">
          <path
            d="M34.344,49.438,7.5,22.593,34.344,49.438,61.188,22.593"
            transform="translate(-7.5 -22.593)"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
          />
        </svg>
      </motion.div>
    </section>
  )
}
