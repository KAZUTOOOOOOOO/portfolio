import { motion, useScroll, useTransform } from "framer-motion"
import { t } from "../tokens"
import LanyardCard from "../components/LanyardCard"

export default function Hero({ dark }) {
  const tk = t(dark)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -60])

  return (
    <section
      className="min-h-screen relative flex items-center px-6 pt-20 overflow-hidden"
      style={{ background: tk.bg }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right,${tk.gridColor} 1px,transparent 1px),linear-gradient(to bottom,${tk.gridColor} 1px,transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: tk.glow1 }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: tk.glow2 }} />

      <motion.div
        style={{ y }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20"
      >
        {/* LEFT — text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-violet-500" />
            <span className="font-mono text-xs text-violet-500 tracking-[0.25em] uppercase">
              Available for work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
            style={{ color: tk.text }}
          >
            <span className="block">Built</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg,#a78bfa,#60a5fa,#67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Different
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-base leading-relaxed max-w-sm"
            style={{ color: tk.textMuted }}
          >
            Saving the internet from ugly UIs because someone had to. 
            I build buttery-smooth frontends and full-stack apps that load faster than your attention span. 0% lag, 100% main character energy, and code that actually compiles on the first try.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-medium text-white transition-all duration-300"
              style={{ background: "#7c3aed", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl transition-all duration-300"
              style={{ border: `1px solid ${tk.border}`, color: tk.textMuted }}
            >
              Contact Me
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-8 mt-14 pt-8"
            style={{ borderTop: `1px solid ${tk.border}` }}
          >
            {[
              { n: "1",   label: "Year Exp" },
              { n: "4",  label: "Projects"  },
              { n: "100%", label: "Remote"    },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="text-2xl font-black" style={{ color: tk.text }}>{n}</div>
                <div className="font-mono text-xs mt-0.5" style={{ color: tk.textMuted }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — lanyard ID card */}
        <div className="flex justify-center lg:justify-end pt-10">
          <LanyardCard dark={dark} />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom,#8b5cf6,transparent)" }}
        />
        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: tk.textSubtle }}>
          SCROLL
        </span>
      </motion.div>
    </section>
  )
}