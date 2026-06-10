import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { t } from "../tokens"

const FadeUp = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

export default function About({ dark }) {
  const tk = t(dark)
  return (
    <section id="about" className="py-32 px-6" style={{ background: dark ? "#050505" : "#fafaf8" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Terminal card */}
        <FadeUp>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: "rgba(139,92,246,0.05)" }} />
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: tk.bgCard,
                border: `1px solid ${tk.border}`,
                boxShadow: dark ? "0 0 30px rgba(139,92,246,0.08)" : "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                <span className="ml-4 font-mono text-xs" style={{ color: tk.textSubtle }}>about.json</span>
              </div>
              <pre className="font-mono text-xs leading-relaxed overflow-auto" style={{ color: dark ? "#a1a1aa" : "#52525b" }}>
{`{
  "name": "Michael Symond S Beldad",
  "role": "Frontend Developer",
  "location": "Bacolor Pampanga",
  "focus": [
    "React Ecosystem",
    "Animation & Motion",
    "Performance & A11y"
  ],
  "currentlyBuilding": "Next-gen UIs",
  "openToWork": true,
  "coffeePerDay": 3
  "YearnTime": 10pm
}`}
              </pre>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl rotate-12" style={{ border: "1px solid rgba(139,92,246,0.2)", background: "rgba(139,92,246,0.04)" }} />
          </div>
        </FadeUp>

        {/* Text */}
        <FadeUp delay={0.2}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-violet-500" />
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6" style={{ color: tk.text }}>
            Turning complex ideas into{" "}
            <span style={{ background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Elegant Interfaces
            </span>
          </h2>
          <div className="space-y-4 leading-relaxed text-sm" style={{ color: tk.textMuted }}>
            <p>I'm a frontend developer obsessed with the intersection of design and engineering. Great software shouldn't just work it should feel remarkable.</p>
            <p>With a year of crafting production applications, I specialize in React ecosystems, animation-heavy UIs, and component libraries that scale.</p>
            <p>When I'm not writing code, I'm exploring WebGL, reverse-engineering beautiful interfaces, or drinking too much coffee until I produce a good one hehe</p>
          </div>
          <div className="flex gap-4 mt-8">
            <a href="#" className="px-5 py-2.5 text-sm font-mono rounded-lg transition" style={{ border: `1px solid ${tk.border}`, color: tk.textMuted }}>Resume.pdf →</a>
            <a href="https://github.com/kazutoooooooo" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 text-sm font-mono rounded-lg transition" style={{ border: `1px solid ${tk.border}`, color: tk.textMuted }}>GitHub →</a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}