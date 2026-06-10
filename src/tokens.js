// src/tokens.js
// Shared design tokens — imported by every component
export const t = (dark) => ({
  bg:          dark ? "#000000"              : "#f5f5f0",
  bgSurface:   dark ? "#0c0c0c"             : "#ffffff",
  bgCard:      dark ? "#0f0f0f"             : "#ffffff",
  border:      dark ? "rgba(63,63,70,0.6)"  : "rgba(0,0,0,0.1)",
  borderAccent:dark ? "rgba(139,92,246,0.3)": "rgba(139,92,246,0.4)",
  text:        dark ? "#ffffff"             : "#0a0a0a",
  textMuted:   dark ? "#71717a"             : "#52525b",
  textSubtle:  dark ? "#3f3f46"             : "#a1a1aa",
  gridColor:   dark ? "rgba(139,92,246,0.06)":"rgba(139,92,246,0.08)",
  glow1:       dark ? "rgba(139,92,246,0.08)":"rgba(139,92,246,0.06)",
  glow2:       dark ? "rgba(59,130,246,0.06)":"rgba(59,130,246,0.05)",
  cardBg:      dark ? "rgba(9,9,11,0.95)"   : "rgba(255,255,255,0.98)",
});