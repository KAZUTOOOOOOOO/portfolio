import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { t } from "../tokens"

export default function Contact({ dark }) {
  const tk = t(dark)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  // ─── FORMSPREE SUBMISSION LOGIC ─────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault() // Stop page reload
    
    // Basic guard check
    if (!form.name || !form.email || !form.message) return

    setLoading(true)
    setErrorMsg("")

    try {
      const response = await fetch("https://formspree.io/f/mwvjvzjp", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })

      if (response.ok) {
        setSent(true) // Triggers your sleek success checkmark screen
        setForm({ name: "", email: "", message: "" }) // Resets form values
      } else {
        const data = await response.json()
        setErrorMsg(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setErrorMsg("Network error. Please check your internet connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 px-6" style={{ background: tk.bg }}>
      <div className="max-w-3xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-violet-500" />
            <span className="font-mono text-xs text-violet-500 tracking-[0.2em] uppercase">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: tk.text }}>
            Let's work together!
          </h2>
          <p className="mb-16 max-w-md" style={{ color: tk.textMuted }}>
            Have a project in mind? My inbox is always open for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: tk.bgCard,
              border: `1px solid ${tk.border}`,
              boxShadow: dark ? "0 0 40px rgba(139,92,246,0.06)" : "0 4px 32px rgba(0,0,0,0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400">✓</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: tk.text }}>Message sent!</h3>
                  <p className="text-sm" style={{ color: tk.textMuted }}>I'll get back to you soon.</p>
                </motion.div>
              ) : (
                // 💡 Converted wrapper to a standard onSubmit HTML form block
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { k: "name",  l: "Name",  ph: "Your Name", type: "text" },
                      { k: "email", l: "Email", ph: "Name@example.com", type: "email" },
                    ].map(({ k, l, ph, type }) => (
                      <div key={k}>
                        <label className="block font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: tk.textSubtle }}>{l}</label>
                        <input
                          type={type}
                          name={k} // Crucial for form parsers
                          required
                          placeholder={ph}
                          value={form[k]}
                          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                          className="w-full rounded-xl px-4 py-3 text-sm transition focus:outline-none focus:border-violet-500"
                          style={{ background: dark ? "#0f0f0f" : "#f4f4f5", border: `1px solid ${tk.border}`, color: tk.text }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: tk.textSubtle }}>Message</label>
                    <textarea
                      name="message" // Crucial for form parsers
                      required
                      rows={5}
                      placeholder="Tell me about your project here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-sm transition focus:outline-none focus:border-violet-500 resize-none"
                      style={{ background: dark ? "#0f0f0f" : "#f4f4f5", border: `1px solid ${tk.border}`, color: tk.text }}
                    />
                  </div>

                  {/* Fallback Error message tracker */}
                  {errorMsg && (
                    <p className="font-mono text-xs text-rose-500 text-center">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ background: "#7c3aed", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}