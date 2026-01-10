'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) { 
        setIsVisible(false) 
      } else { 
        setIsVisible(true) 
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          initial={{ y: -100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: -100, x: '-50%', opacity: 0 }}
          className="fixed top-14 md:top-6 left-1/2 z-[100] glass px-4 md:px-8 py-3 rounded-full flex items-center gap-3 md:gap-8 text-[11px] md:text-sm shadow-xl w-[90%] md:w-auto justify-between md:justify-start"
        >
          <div className="flex items-center border-r border-black/10 dark:border-white/10 pr-3 md:pr-6">
            <span className="font-black tracking-tighter text-sm md:text-lg text-black dark:text-white">
              VIVEK
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto no-scrollbar">
            <a href="#skills" className="hover:opacity-50 transition-opacity dark:text-white/90 whitespace-nowrap">Skills</a>
            <a href="#projects" className="hover:opacity-50 transition-opacity dark:text-white/90 whitespace-nowrap">Projects</a>
            <a href="#experience" className="hover:opacity-50 transition-opacity dark:text-white/90 whitespace-nowrap">Experience</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity dark:text-white/90 whitespace-nowrap">Contact</a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}