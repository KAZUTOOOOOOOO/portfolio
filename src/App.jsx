import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { t } from "./tokens"
import Preloader from "./components/Preloader"
import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Portfolio from "./sections/Portfolio"
import Skills from "./sections/Skills"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [dark, setDark] = useState(true)
  const toggleTheme = () => setDark((d) => !d)

  return (
    <div style={{ background: t(dark).bg, minHeight: "100vh" }}>
      <Preloader onComplete={() => setLoaded(true)} />
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar dark={dark} toggleTheme={toggleTheme} />
            <Hero dark={dark} />
            <About dark={dark} />
            <Portfolio dark={dark} />
            <Skills dark={dark} />
            <Contact dark={dark} />
            <Footer dark={dark} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}