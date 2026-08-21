import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/**
 * Wraps its children in a fade-in + slide-up animation that triggers once
 * when scrolled into view. Pass `lines` (array of strings/nodes) instead of
 * `children` to stagger each line individually (used for multi-line headings).
 */
export default function ScrollReveal({
  as: Tag = 'div',
  lines,
  lineClassName = '',
  children,
  className = '',
  ...props
}) {
  if (lines) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className={className}
        {...props}
      >
        {lines.map((content, i) => (
          <Tag key={i}>
            <motion.span variants={line} className={`block ${lineClassName}`}>
              {content}
            </motion.span>
          </Tag>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={line}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
