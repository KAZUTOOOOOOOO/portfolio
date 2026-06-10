import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { t } from "../tokens"

const SKILLS = [
  { name: "React / Next.js", level: 46, category: "Frontend" },
  { name: "TypeScript",      level: 33, category: "Frontend" },
  { name: "Tailwind CSS",    level: 62, category: "Frontend" },
  { name: "Framer Motion",   level: 54, category: "Frontend" },
  { name: "Node.js / Express", level: 40, category: "Backend" },
  { name: "MongoDB",      level: 15, category: "Backend"  },
  { name: "MySQL",      level: 55, category: "Backend"  },
  { name: "Three.js / WebGL", level: 55, category: "Creative" },
  { name: "Figma / Design",  level: 90, category: "Design"   },
]

function SkillBar({ skill, index, dark }) {
  const tk = t(dark)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.06 }}>
      <div className="flex justify-between mb-2">
        <span className="text-sm" style={{ color: tk.text }}>{skill.name}</span>
        <span className="font-mono text-xs" style={{ color: tk.textMuted }}>{skill.level}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: dark ? "#18181b" : "#e4e4e7" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.06 + 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#7c3aed,#3b82f6)" }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills({ dark }) {
  const tk = t(dark)
  const categories = [...new Set(SKILLS.map((s) => s.category))]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="skills" className="py-32 px-6" style={{ background: dark ? "#050505" : "#fafaf8" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-violet-500" />
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase">Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16" style={{ color: tk.text }}>Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((cat, ci) => {
            const catRef = useRef(null)
            const catInView = useInView(catRef, { once: true, margin: "-60px" })
            return (
              <motion.div key={cat} ref={catRef} initial={{ opacity: 0, y: 40 }} animate={catInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: ci * 0.1 }}>
                <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-violet-500 mb-6">{cat}</h3>
                <div className="space-y-5">
                  {SKILLS.filter((s) => s.category === cat).map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} dark={dark} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}