import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv)
          setTimeout(() => setDone(true), 400)
          setTimeout(() => onComplete(), 900)
          return 100
        }
        return Math.min(p + Math.random() * 12 + 3, 100)
      })
    }, 80)
    return () => clearInterval(iv)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right,#8b5cf6 1px,transparent 1px),linear-gradient(to bottom,#8b5cf6 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 text-center">
            <div className="font-mono text-[10px] text-zinc-600 tracking-[0.35em] mb-8 uppercase">
              Michael Portfolio
            </div>

            <motion.div
              className="w-16 h-16 mx-auto mb-10 border border-violet-500/30 rounded-xl flex items-center justify-center relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-2 border border-violet-500/20 rounded-lg" />
              <div className="w-3 h-3 bg-violet-500 rounded-sm" />
            </motion.div>

            <div className="w-48 h-px bg-zinc-900 mx-auto mb-3">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-100"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <div className="font-mono text-xs text-zinc-600">
              {String(Math.min(Math.floor(progress), 100)).padStart(3, "0")}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}