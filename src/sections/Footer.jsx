import { t } from "../tokens"

export default function Footer({ dark }) {
  const tk = t(dark)
  return (
    <footer className="py-12 px-6" style={{ borderTop: `1px solid ${tk.border}`, background: tk.bg }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ border: "1px solid rgba(139,92,246,0.4)" }}>
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-sm" />
          </div>
          <span className="font-mono text-sm" style={{ color: tk.textMuted }}>
            Michael<span className="text-violet-500">.WEB</span>
          </span>
        </div>

        <p className="font-mono text-xs" style={{ color: tk.textSubtle }}>
          © {new Date().getFullYear()} Michael Symond Saplala. Built with React, Vite, Tailwind CSS, and JavaScript
        </p>

        <div className="flex gap-5">
          {[
            { label: "GitHub",   href: "https://github.com/kazutoooooooo" },
            { label: "Instagram",  href: "https://www.instagram.com/krio_xzxz/" },
            { label: "Facebook", href: "https://www.facebook.com/michael.saplala.2025" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors hover:text-violet-400"
              style={{ color: tk.textSubtle }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}