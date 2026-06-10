import { motion } from "framer-motion"

export default function ThemeToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      className="relative w-11 h-6 rounded-full transition-all duration-500 focus:outline-none"
      style={{
        background: dark
          ? "linear-gradient(135deg, #4c1d95, #1e3a8a)"
          : "linear-gradient(135deg, #fde68a, #fb923c)",
        boxShadow: dark
          ? "0 0 12px rgba(139,92,246,0.3)"
          : "0 0 12px rgba(251,146,60,0.4)",
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: dark ? 2 : 22 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
        style={{ background: "#fff", left: 0 }}
      >
      </motion.div>
    </button>
  )
}