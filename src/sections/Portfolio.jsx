import { useRef, useState, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { t } from "../tokens"

// ─── YOUR PROJECTS ────────────────────────────────────────────
// To add thumbnails:
// 1. Copy images to src/assets/   (e.g. pampcentral.png, valentine.jpg)
// 2. Uncomment the imports below
// 3. Set thumb: pampImg  /  thumb: valentineImg

import pampImg from "../assets/pampcentral.jpg"
import valentineImg from "../assets/valentine.jpg"

const PROJECTS = [
  {
    id: 1,
    title: "PampCentral",
    category: "School System · Web App",
    tags: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    url: "https://kazutoooooooo.github.io/Pampcentral/",
    desc: "All-in-one hub for Pampanga State University: Grab-style food delivery, student portal with grades, school transport booking, uniform shop, campus tours, and event ticketing.",
    thumb: pampImg,          
    accentColor: "#ec0f0f",
  },
  {
    id: 2,
    title: "Valentine Web",
    category: "Personal · Mini Site",
    tags: ["HTML", "CSS"],
    year: "2025",
    url: "https://kazutoooooooo.github.io/random-web/",
    desc: "A surprise Valentine's Day page built for someone special. Simple yes/no interaction with cute animations. Sometimes the simplest projects hit hardest.",
    thumb: valentineImg,           
    accentColor: "#ec0f0f",
  },
]

// ─── FLOATING THUMBNAIL ───────────────────────────────────────
function CursorThumb({ thumb, accentColor, visible, x, y }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{ left: x, top: y, translateX: "-50%", translateY: "-65%" }}
          initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          exit={{ opacity: 0, scale: 0.78, rotate: -3 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div
            className="w-64 h-40 rounded-2xl overflow-hidden"
            style={{
              border: `2px solid ${accentColor}50`,
              boxShadow: `0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px ${accentColor}20`,
              backgroundColor: "#18181b",
            }}
          >
            {thumb ? (
              <img src={thumb} alt="preview" className="w-full h-full object-cover block" />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2 font-mono text-[10px]"
                style={{ background: `linear-gradient(135deg,${accentColor}20,${accentColor}06)`, color: accentColor }}
              >
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── PROJECT ROW ──────────────────────────────────────────────
function ProjectRow({ project, index, dark }) {
  const tk = t(dark)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <>
      <CursorThumb
        thumb={project.thumb}
        accentColor={project.accentColor}
        visible={hovered}
        x={pos.x}
        y={pos.y}
      />

      <motion.a
        ref={ref}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.12 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMouseMove}
        className="group block relative py-8"
        style={{ borderBottom: `1px solid ${tk.border}`, cursor: "none" }}
      >
        {/* Hoverwash */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(100deg,${project.accentColor}08,transparent 60%)` }}
        />

        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
          animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: project.accentColor, transformOrigin: "top" }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center gap-3 md:gap-0 pl-4 pr-2">

          {/* Index */}
          <span
            className="font-mono text-xs w-10 shrink-0 transition-colors duration-300"
            style={{ color: hovered ? project.accentColor : tk.textSubtle }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300"
              style={{ color: hovered ? project.accentColor : tk.text }}
            >
              {project.title}
            </h3>
            <p className="font-mono text-[11px] mt-0.5 transition-colors duration-300" style={{ color: hovered ? tk.textMuted : tk.textSubtle }}>
              {project.category}
            </p>
          </div>

          {/* Description (desktop) */}
          <motion.p
            className="hidden md:block text-sm leading-relaxed w-72 shrink-0"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 12 }}
            transition={{ duration: 0.25 }}
            style={{ color: tk.textMuted }}
          >
            {project.desc}
          </motion.p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 md:w-40 md:justify-end shrink-0">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-mono rounded-lg transition-all duration-300"
                style={{
                  background: hovered ? `${project.accentColor}18` : dark ? "#18181b" : "#f4f4f5",
                  border: `1px solid ${hovered ? project.accentColor + "45" : tk.border}`,
                  color: hovered ? project.accentColor : tk.textMuted,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Year + arrow */}
          <div className="flex items-center gap-2 md:w-20 md:justify-end shrink-0">
            <span className="font-mono text-xs" style={{ color: tk.textSubtle }}>{project.year}</span>
            <motion.span
              animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.25 }}
              transition={{ duration: 0.2 }}
              className="text-base font-bold"
              style={{ color: project.accentColor }}
            >
              
            </motion.span>
          </div>
        </div>

        {/* Description (mobile) */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden text-sm leading-relaxed pl-14 pr-2 overflow-hidden"
              style={{ color: tk.textMuted }}
            >
              {project.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.a>
    </>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function Portfolio({ dark }) {
  const tk = t(dark)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="projects" className="py-32 px-6" style={{ background: tk.bg }}>
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-violet-500" />
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase">Selected Work</span>
          </div>
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: tk.text }}>Projects</h2>
              <p className="mt-2 text-sm" style={{ color: tk.textMuted }}>Hover a project to preview it</p>
            </div>
            <a
              href="https://github.com/kazutoooooooo"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 font-mono text-xs transition-colors hover:text-violet-400"
              style={{ color: tk.textSubtle }}
            >
              All on GitHub →
            </a>
          </div>
        </motion.div>

        <div style={{ borderTop: `1px solid ${tk.border}` }} />

        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} dark={dark} />
        ))}

        {/* More soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="py-7 pl-4 flex items-center gap-4"
          style={{ borderBottom: `1px solid ${tk.border}` }}
        >
          <span className="font-mono text-xs w-10" style={{ color: tk.textSubtle }}>03</span>
          <span className="font-mono text-sm" style={{ color: tk.textSubtle }}>More coming soon...</span>
        </motion.div>
      </div>
    </section>
  )
}