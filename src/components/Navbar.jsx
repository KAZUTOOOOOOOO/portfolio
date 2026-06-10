import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { t } from "../tokens"
import ThemeToggle from "./ThemeToggle"

export default function Navbar({ dark, toggleTheme }) {
  const tk = t(dark)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = ["About", "Projects", "Skills", "Contact"]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled
          ? dark ? "rgba(0,0,0,0.85)" : "rgba(245,245,240,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${tk.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ border: "1px solid rgba(139,92,246,0.5)" }}
          >
            <div className="w-2 h-2 bg-violet-500 rounded-sm" />
          </div>
          <span className="font-mono text-sm" style={{ color: tk.textMuted }}>
            Michael<span className="text-violet-500">.WEB</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-sm tracking-wide transition-colors hover:text-violet-400"
              style={{ color: tk.textMuted }}
            >
              {link}
            </a>
          ))}
          <ThemeToggle dark={dark} toggle={toggleTheme} />
          <button
            className="px-4 py-2 text-sm font-mono rounded-lg transition-all"
            style={{ border: "1px solid rgba(139,92,246,0.4)", color: "#a78bfa" }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Size */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle dark={dark} toggle={toggleTheme} />
          <button onClick={() => setOpen(!open)} className="flex flex-col gap-1.5 p-2">
            <span className="w-5 h-px block transition-all" style={{ background: tk.text, transform: open ? "rotate(45deg) translate(2px,6px)" : "" }} />
            <span className="w-5 h-px block transition-all" style={{ background: tk.text, opacity: open ? 0 : 1 }} />
            <span className="w-5 h-px block transition-all" style={{ background: tk.text, transform: open ? "rotate(-45deg) translate(2px,-6px)" : "" }} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 py-4 flex flex-col gap-4"
            style={{
              background: dark ? "rgba(0,0,0,0.95)" : "rgba(245,245,240,0.97)",
              borderBottom: `1px solid ${tk.border}`,
            }}
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="font-mono text-sm"
                style={{ color: tk.textMuted }}
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}