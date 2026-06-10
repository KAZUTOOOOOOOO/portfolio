import { useState, useEffect, useRef, useCallback } from "react"
import { t } from "../tokens"
import myPhoto from "../assets/photo.jpg"


export default function LanyardCard({ dark }) {
  const tk = t(dark)
  const containerRef = useRef(null)
  const angleRef = useRef(0)
  const angVelRef = useRef(0)
  const isDragging = useRef(false)
  const lastMouseAngle = useRef(0)
  const lastMouseAnglePrev = useRef(0)
  const lastMouseTime = useRef(0)
  const rafRef = useRef(null)
  const [angle, setAngle] = useState(0)

  const GRAVITY = 0.006
  const DAMPING = 0.97
  const STIFFNESS = 0.04

  // Physics loop
  useEffect(() => {
    const loop = () => {
      if (!isDragging.current) {
        angVelRef.current += -STIFFNESS * angleRef.current
        angVelRef.current *= DAMPING
        angVelRef.current += -GRAVITY * Math.sin(angleRef.current)
        angleRef.current += angVelRef.current
        setAngle(angleRef.current)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const getPivot = () => {
    if (!containerRef.current) return { x: 0, y: 0 }
    const r = containerRef.current.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top }
  }

  const toAngle = (cx, cy) => {
    const p = getPivot()
    return Math.atan2(cx - p.x, cy - p.y)
  }

  const onMouseDown = (e) => {
    isDragging.current = true
    const a = toAngle(e.clientX, e.clientY)
    lastMouseAngle.current = a
    lastMouseAnglePrev.current = a
    lastMouseTime.current = Date.now()
  }

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return
    const a = toAngle(e.clientX, e.clientY)
    angleRef.current = a
    lastMouseAnglePrev.current = lastMouseAngle.current
    lastMouseAngle.current = a
    lastMouseTime.current = Date.now()
    setAngle(a)
  }, [])

  const onMouseUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    const dt = Date.now() - lastMouseTime.current
    angVelRef.current = dt < 80
      ? (lastMouseAngle.current - lastMouseAnglePrev.current) * 0.6
      : 0
  }, [])

  const onTouchStart = (e) => {
    isDragging.current = true
    const touch = e.touches[0]
    const a = toAngle(touch.clientX, touch.clientY)
    lastMouseAngle.current = a
    lastMouseAnglePrev.current = a
    lastMouseTime.current = Date.now()
  }

  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return
    const touch = e.touches[0]
    const a = toAngle(touch.clientX, touch.clientY)
    angleRef.current = a
    lastMouseAnglePrev.current = lastMouseAngle.current
    lastMouseAngle.current = a
    lastMouseTime.current = Date.now()
    setAngle(a)
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onMouseUp)
    }
  }, [onMouseMove, onMouseUp, onTouchMove])

  const DEG = (angle * 180) / Math.PI
  const CARD_H = 340
  const LANYARD_LEN = 80
  const cx = 140
  const bend = Math.sin(angle) * 30
  const lanyardPath = `M ${cx} 0 Q ${cx + bend} ${LANYARD_LEN * 0.5} ${cx} ${LANYARD_LEN}`

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ width: 280, height: CARD_H + LANYARD_LEN + 24 }}
    >
      {/* SVG Lanyard rope */}
      <svg
        width="280"
        height={LANYARD_LEN + 4}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <path d={lanyardPath} stroke={tk.textSubtle} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.3" />
        <path d={lanyardPath} stroke="url(#lg)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx={cx} cy={LANYARD_LEN} r="5" fill={tk.textSubtle} />
        <circle cx={cx} cy={LANYARD_LEN} r="3" fill={dark ? "#1c1c1e" : "#e4e4e7"} />
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Card */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          top: LANYARD_LEN - 2,
          left: 0,
          width: 280,
          transformOrigin: "50% 0%",
          transform: `rotate(${DEG}deg)`,
          zIndex: 3,
        }}
      >
        {/* Glow aura */}
        <div
          className="absolute -inset-3 rounded-3xl blur-xl pointer-events-none"
          style={{ background: "rgba(151, 112, 241, 0.09)" }}
        />

        {/* Card body */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: tk.cardBg,
            border: `1px solid ${tk.borderAccent}`,
            boxShadow: dark
              ? "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.1)"
              : "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(139,92,246,0.15)",
          }}
        >
          {/* Top gradient strip */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#8b5cf6,#3b82f6,#06b6d4)" }} />

          {/* Lanyard hole */}
          <div className="flex justify-center pt-3 pb-1">
            <div
              className="w-5 h-5 rounded-full border-2"
              style={{
                borderColor: tk.border,
                background: dark ? "#000" : "#e4e4e7",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
              }}
            />
          </div>

          <div className="px-5 pb-5">
            {/* Status row */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: tk.textMuted }}>Developer ID</p>
                <p className="font-mono text-[8px]" style={{ color: tk.textSubtle }}>ACTIVE</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
                <span className="font-mono text-[9px] text-emerald-400">ONLINE</span>
              </div>
            </div>

            {/* Photo ng pogi*/}
            <div
              className="w-full h-36 rounded-xl mb-4 overflow-hidden"
              style={{ border: `0.5px solid ${tk.border}` }}
            >
              {myPhoto ? (
                <img
                  src={myPhoto}
                  alt="Your photo"
                  className="w-full h-full object-cover"
                style={{
                  objectPosition: "3px -30px",
                  transform: "scale(1.2)",
                }}
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-1"
                  style={{
                    background: dark
                      ? "linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.08))"
                      : "linear-gradient(135deg,rgba(139,92,246,0.07),rgba(59,130,246,0.04))",
                  }}
                >
                  <span className="text-3xl">🧑‍💻</span>
                  <p className="font-mono text-[9px]" style={{ color: tk.textMuted }}>your-photo.jpg</p>
                  <p className="font-mono text-[8px]" style={{ color: tk.textSubtle }}>src/assets/photo.jpg</p>
                </div>
              )}
            </div>

            {/* Name + roles */}
            <h1 className="text-base font-black tracking-tight" style={{ color: tk.text }}>Michael Symond S Beldad</h1>
            <p className="font-mono text-xs mt-0.5" style={{ color: tk.textMuted }}>Frontend Developer</p>

            {/* Info grid */}
            <div className="mt-4 pt-4 grid grid-cols-2 gap-2" style={{ borderTop: `1px solid ${tk.border}` }}>
              {[
                { label: "Stack", value: "React" },
                { label: "Style", value: "Tailwind" },
                { label: "Focus", value: "UI/UX" },
                { label: "Status", value: "Open" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: tk.textSubtle }}>{label}</p>
                  <p className="font-mono text-[11px] mt-0.5" style={{ color: tk.textMuted }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Barcode */}
            <div className="mt-4 flex gap-px opacity-25">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-1" style={{ height: i % 3 === 0 ? 14 : i % 5 === 0 ? 10 : 12, background: tk.text }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p className="absolute font-mono text-[9px] text-center w-full pointer-events-none" style={{ bottom: 0, color: tk.textSubtle }}>
        ↕ drag to swing
      </p>
    </div>
  )
}