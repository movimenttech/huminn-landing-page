import { motion, AnimatePresence } from 'framer-motion'

export default function PortfolioModal({ project, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl bg-white rounded-md overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={project.heroImage}
                alt={project.name}
                className="w-full aspect-[2/1] object-cover"
              />

              <button
                type="button"
                aria-label="Projeto anterior"
                onClick={onPrev}
                className="group absolute inset-y-0 left-0 w-[clamp(56px,6.3vw,121px)] flex items-center justify-start pl-4 bg-gradient-to-r from-black/40 to-transparent"
              >
                <svg viewBox="0 0 56 35" className="h-5 w-8 rotate-90" fill="none">
                  <path
                    d="M28,34.82,0,0,28,34.82,56,0"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="6"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Próximo projeto"
                onClick={onNext}
                className="group absolute inset-y-0 right-0 w-[clamp(56px,6.3vw,121px)] flex items-center justify-end pr-4 bg-gradient-to-l from-black/40 to-transparent"
              >
                <svg viewBox="0 0 56 35" className="h-5 w-8 -rotate-90" fill="none">
                  <path
                    d="M28,34.82,0,0,28,34.82,56,0"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="6"
                  />
                </svg>
              </button>
            </div>

            <div className="font-space text-huminn-gray-text text-sm md:text-lg leading-relaxed p-6 md:px-[clamp(24px,6.3vw,121px)] md:py-[clamp(24px,3.13vw,60px)] space-y-4">
              {project.modalParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className="absolute -top-2 -right-2 md:top-6 md:right-6 h-12 w-12 md:h-[clamp(48px,3.49vw,67px)] md:w-[clamp(48px,3.49vw,67px)] rounded-full bg-white flex items-center justify-center shadow-lg"
            >
              <svg viewBox="0 0 36 36" className="h-4 w-4 md:h-5 md:w-5" fill="none">
                <path
                  d="M30.046,7.545,28.454,5.955,18,16.409,7.546,5.955,5.954,7.545,16.409,18,5.954,28.455l1.591,1.591L18,19.591,28.454,30.045l1.591-1.591L19.591,18,30.046,7.545Z"
                  stroke="#000"
                  strokeWidth="2"
                  fill="#000"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
