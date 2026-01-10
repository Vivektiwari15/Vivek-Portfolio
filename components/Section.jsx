'use client'
import { motion } from 'framer-motion'

export default function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-24 relative"
    >
      <h2 className="text-4xl font-black text-center mb-16 tracking-tighter dark:text-white">{title}</h2>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </motion.section>
  )
}