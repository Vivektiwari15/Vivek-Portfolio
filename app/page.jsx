'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import ThemeToggle from '@/components/ThemeToggle'
import EliteHero from '@/components/EliteHero'
import Section from '@/components/Section'
import CustomCursor from '@/components/effects/CustomCursor'
import emailjs from '@emailjs/browser'

const ExplodedCube = dynamic(() => import('@/components/effects/ExplodedCube'), { ssr: false })

export default function Home() {
  const form = useRef()
  const [status, setStatus] = useState('Send Message')
  const [isDark, setIsDark] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('Sending...')
    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, 
      form.current, 
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setStatus('Message Sent! ✅')
      form.current.reset()
      setTimeout(() => setStatus('Send Message'), 3000)
    }, (error) => {
      setStatus('Failed ❌')
    })
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
          >
            <motion.div className="relative text-8xl font-black flex">
              <motion.span 
                initial={{ x: 30, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.8 }}
                className="text-black"
              >V</motion.span>
              <motion.span 
                initial={{ x: -30, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-black ml-[-15px]"
              >T</motion.span>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-2 left-0 w-full h-2 bg-black origin-left"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <ThemeToggle onChange={setIsDark} />   
        <CustomCursor />
        <Navbar />
        <ExplodedCube isDark={isDark}/>
        
        <EliteHero isDark={isDark} />

        <Section id="skills" title="Skills">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["MongoDB","Express","React","Node","HTML","CSS","JavaScript","Docker","Git","Figma", "UI/UX", "SQL"].map((s, i) => (
              <motion.div 
                key={s} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6 text-center dark:text-white"
              >
                {s}
              </motion.div>
            ))}
          </div>
        </Section>
{/* ---------------------------PROJECTS SECTION----------------------------*/}
      <Section id="projects" title="Projects">
  {/* Added grid-cols-1 for mobile, 2 for tablet, 3 for desktop */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        name: "Style  Lust",
        type: "social-discovery",
        desc: "Fashion app delivering outfit inspiration with suggestions for easy styling!",
        tags: ["MongoDB", "React", "Node", "Express"],
        link: "https://github.com/Vivektiwari15/StyleLust"
      },
      {
        name: "GOFOOD",
        type: "Food-delivery",
        desc: "A food ordering app lets users browse menus, order meals, track deliveries, and pay.",
        tags: ["MongoDB", "React + Bootstrap", "Node", "Express"],
        link: "https://github.com/Vivektiwari15/GOFOOD"
      },
      {
        name: "Inotebook",
        type: "Notes App",
        desc: "MERN notes app supports CRUD operations with responsive UI and efficient MongoDB data management.",
        tags: ["MongoDB", "React", "Node", "Express"],
        link: "https://github.com/Vivektiwari15/Inotebook"
      },
      {
        name: "InfoNewsy",
        type: "News App",
        desc: "InfoNewsy is a React news app delivering real-time headlines via external APIs globally fast.",
        tags: ["React", "API", "CSS"],
        link: "https://github.com/Vivektiwari15/Infonewsy"
      },
      {
        name: "Weather-Wise",
        type: "Weather App",
        desc: "Node.js EJS weather app provides real-time updates forecasts with dynamic simple interface globally UI",
        tags: ["HTML", "CSS", "Node", "EJS"],
        link: "https://github.com/Vivektiwari15/Weather-App"
      },
      {
        name: "Codeblooded",
        type: "Static Website",
        desc: "Static Bootstrap website showcasing tech blogs and related articles with clean modern fluid layout.",
        tags: ["HTML", "CSS", "Bootstrap"],
        link: "https://github.com/Vivektiwari15/codeblooded"
      }
    ].map((project, index) => (
      <motion.a
        key={index}
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        viewport={{ once: true }}
        /* Reduced vertical padding (py-6) and height (min-h-[unset]) */
        className="glass group relative overflow-hidden rounded-[20px] px-6 py-6 transition-all border border-transparent hover:border-black/10 dark:hover:border-white/20 flex flex-col justify-between"
      >
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] font-semibold opacity-40 dark:text-white mb-1">
            {project.type}
          </p>
          <h3 className="font-black text-xl tracking-tighter dark:text-white">
            {project.name}
          </h3>
          <p className="text-xs opacity-60 mt-2 dark:text-white/70 leading-relaxed line-clamp-2">
            {project.desc}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 dark:text-white/80 border border-black/5 dark:border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 dark:text-white">
            GitHub 
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.a>
    ))}
  </div>
</Section>

{/* -------------------------PROJECTS SECTION---------------------*/}        

     <Section id="experience" title="Experience">
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    /* Changed p-12 to px-8 py-20 (more vertical space) and added min-h */
    className="glass rounded-[32px] px-8 py-20 text-center max-w-3xl mx-auto flex flex-col justify-center min-h-[450px] shadow-2xl"
  >
    <h3 className="text-3xl md:text-4xl font-black tracking-tighter dark:text-white uppercase">
      Node.js Developer Intern
    </h3>
    <p className="mt-2 text-sm uppercase tracking-[0.3em] opacity-50 dark:text-white">
      3 Months Internship at Cypher's Technolabs
    </p>

    <p className="mt-8 text-base md:text-lg opacity-70 dark:text-white/70 leading-relaxed max-w-2xl mx-auto">
      Built scalable Node.js backend services, engineered RESTful APIs, optimized MongoDB data layers, enforced application-level security, and collaborated with front-end teams to deliver high-performance, production-ready solutions.
    </p>

    <div className="mt-12">
      <a 
        href="/Vivek_Tiwari_Experience.pdf" 
        download
        onClick={(e) => {
          const fileExists = true; 
          if(!fileExists) {
             e.preventDefault();
             alert("Certificate will be available shortly!");
          }
        }}  
        id='form-btn'
        className="hero-btn btn-hire inline-block mt-8 px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium hover:scale-105 active:scale-95 transition-all shadow-lg"

>

Download Experience Letter
      </a>
    </div>
  </motion.div>
</Section>

       <section id="contact" className="py-24 px-4 relative z-20">
  <h2 className="text-4xl font-black text-center mb-16 tracking-tighter dark:text-white uppercase">
    Get In Touch
  </h2>
  
  <form 
    ref={form} 
    onSubmit={sendEmail} 
    className="max-w-xl mx-auto glass rounded-[32px] p-8 md:p-12 flex flex-col gap-5 shadow-2xl"
  >
    <div className="flex flex-col gap-2">
      <input 
        type="text" 
        name="from_name" 
        placeholder="Your Name" 
        required 
        className="contact-input" 
      />
    </div>

    <div className="flex flex-col gap-2">
      <input 
        type="email" 
        name="from_email" 
        placeholder="Your Email" 
        required 
        className="contact-input" 
      />
    </div>

    <div className="flex flex-col gap-2">
      <textarea 
        name="message" 
        placeholder="How can I help you?" 
        rows="5" 
        required 
        className="contact-input resize-none"
      ></textarea>
    </div>

    <button 
      type="submit" 
      id="form-btn"
      className="hero-btn btn-hire w-full mt-4 py-4 text-lg"
    >
      {status}
    </button>
  </form>
</section>
        
        <footer className="py-10 text-center opacity-40 text-xs tracking-widest uppercase dark:text-white">
          © {new Date().getFullYear()} Vivek Tiwari • Crafted with Code
        </footer>
      </motion.div>
    </>
  )
}