import React, { useState, useEffect, useRef } from "react";

// --- Theme & Data ---
const COLORS = {
  bg: "#0F0A14",
  card: "rgba(26, 18, 36, 0.7)",
  border: "rgba(255, 77, 141, 0.15)",
  primary: "#C2185B",
  secondary: "#FF4D8D",
  accent: "#FF80AB",
  text: "#FCE4EC",
  textSoft: "#F8BBD0",
};

const CONTACTS = [
  { id: 1, name: "Priya Sharma", initials: "PS", status: "Watching", color: "#FF4D8D" },
  { id: 2, name: "Ananya Iyer", initials: "AI", status: "Notified", color: "#C2185B" },
  { id: 3, name: "Ritu Malhotra", initials: "RM", status: "Offline", color: "#7B1FA2" },
  { id: 4, name: "Kavya Nair", initials: "KN", status: "Watching", color: "#FF80AB" },
];

const COMPANION_REPLIES = [
  "I'm right here with you. Stay calm and keep moving. 💗",
  "You're doing great! I'm watching your route in real time.",
  "Your contacts have been alerted. You're not alone. 🌟",
  "Take a deep breath. I'm here. Stay on the lit path.",
  "Checking on you — everything looks okay from my end. 💪",
];

const ROUTE_POINTS = [
  { x: 15, y: 75 }, { x: 25, y: 60 }, { x: 40, y: 55 },
  { x: 55, y: 40 }, { x: 70, y: 35 }, { x: 85, y: 20 },
];

export default function WalkWithMe() {
  const [sessionActive, setSessionActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, from: "companion", text: "Welcome to Walk With Me. I'm your safety companion tonight. Start your session whenever you're ready. 💗", time: "Now" },
  ]);
  const [inputText, setInputText] = useState("");
  const [sosActive, setSosActive] = useState(false);
  const [routeProgress, setRouteProgress] = useState(0);

  const chatEndRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (sessionActive) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      const routeInterval = setInterval(() => {
        setRouteProgress(prev => (prev < ROUTE_POINTS.length - 1 ? prev + 1 : prev));
      }, 5000);
      return () => {
        clearInterval(timerRef.current);
        clearInterval(routeInterval);
      };
    } else {
      setElapsed(0);
      setRouteProgress(0);
    }
  }, [sessionActive]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const sendMessage = (text) => {
    if (!text || !text.trim()) return;
    const newMsg = { id: Date.now(), from: "user", text: text.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setTimeout(() => {
      const reply = COMPANION_REPLIES[Math.floor(Math.random() * COMPANION_REPLIES.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "companion", text: reply }]);
    }, 1200);
  };

  const triggerSOS = () => {
    setSosActive(true);
    sendMessage("🆘 SOS TRIGGERED — Emergency help requested!");
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      fontFamily: "'DM Sans', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,600;1,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Starfield ── */
        .starfield {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
        }
        .starfield::before, .starfield::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,200,220,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 27% 44%, rgba(255,180,210,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 38% 9%, rgba(255,220,235,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 53% 67%, rgba(255,200,225,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 67% 29%, rgba(255,190,215,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 74% 82%, rgba(255,215,230,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 81% 14%, rgba(255,200,220,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 91% 53%, rgba(255,185,210,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 7% 73%, rgba(255,210,230,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 45% 38%, rgba(255,225,240,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 90%, rgba(255,195,220,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 55%, rgba(255,210,230,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 88% 35%, rgba(255,220,235,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 33% 79%, rgba(255,180,210,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 96% 71%, rgba(255,200,225,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 4% 32%, rgba(255,215,235,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 16% 92%, rgba(255,200,220,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 6%, rgba(255,185,210,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 48% 57%, rgba(255,210,230,0.4) 0%, transparent 100%),
            radial-gradient(2px 2px at 79% 48%, rgba(255,225,240,0.9) 0%, transparent 100%);
        }
        .starfield::after {
          background-image:
            radial-gradient(1px 1px at 9% 41%, rgba(255,200,220,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 22% 67%, rgba(255,180,210,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 41% 23%, rgba(255,220,235,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 57% 78%, rgba(255,200,225,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 73% 12%, rgba(255,190,215,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 86% 61%, rgba(255,215,230,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 94% 24%, rgba(255,200,220,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 3% 86%, rgba(255,185,210,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 13%, rgba(255,210,230,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 64% 47%, rgba(255,225,240,0.4) 0%, transparent 100%);
          opacity: 0.6;
        }

        /* ── Ambient gradient orbs ── */
        .orb {
          position: fixed; border-radius: 50%; filter: blur(80px);
          pointer-events: none; z-index: 0;
        }
        .orb-1 {
          width: 500px; height: 500px; top: -120px; right: -100px;
          background: radial-gradient(circle, rgba(194,24,91,0.18) 0%, transparent 70%);
        }
        .orb-2 {
          width: 400px; height: 400px; bottom: 0; left: -80px;
          background: radial-gradient(circle, rgba(255,77,141,0.12) 0%, transparent 70%);
        }
        .orb-3 {
          width: 300px; height: 300px; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(255,128,171,0.07) 0%, transparent 70%);
        }

        /* ── Glass Card ── */
        .card {
          background: rgba(26, 18, 36, 0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 77, 141, 0.14);
          border-radius: 28px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,180,210,0.06);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card:hover {
          border-color: rgba(255, 77, 141, 0.26);
          box-shadow: 0 12px 50px rgba(194,24,91,0.15), inset 0 1px 0 rgba(255,180,210,0.08);
        }

        /* ── Buttons ── */
        .btn-primary {
          background: linear-gradient(135deg, #C2185B, #FF4D8D);
          border: none; border-radius: 16px; color: white;
          font-weight: 600; font-size: 15px; cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(194,24,91,0.35);
          letter-spacing: 0.3px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,77,141,0.45);
          filter: brightness(1.08);
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; color: #FCE4EC;
          font-weight: 500; font-size: 14px; cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-ghost:hover {
          background: rgba(255,77,141,0.12);
          border-color: rgba(255,77,141,0.35);
          box-shadow: 0 0 16px rgba(255,77,141,0.15);
          transform: translateY(-1px);
        }

        .btn-sos {
          background: linear-gradient(135deg, #B71C1C, #C2185B);
          border: none; border-radius: 18px; color: white;
          font-weight: 800; font-size: 17px; cursor: pointer;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 24px rgba(183,28,28,0.4);
          transition: all 0.25s ease;
        }
        .btn-sos:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(194,24,91,0.5);
          filter: brightness(1.1);
        }

        /* ── SOS pulse animation ── */
        @keyframes sosPulse {
          0%   { box-shadow: 0 0 10px #C2185B, 0 4px 24px rgba(183,28,28,0.4); transform: scale(1); }
          100% { box-shadow: 0 0 50px #FF4D8D, 0 8px 40px rgba(255,77,141,0.6); transform: scale(1.02); }
        }
        .sos-anim { animation: sosPulse 0.7s infinite alternate; }

        /* ── Dot blink ── */
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .dot { animation: blink 1.8s infinite; }

        /* ── Fade-in ── */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease forwards; }

        /* ── Timer pulse ── */
        @keyframes timerGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,77,141,0.4); }
          50%       { text-shadow: 0 0 40px rgba(255,77,141,0.7), 0 0 80px rgba(194,24,91,0.3); }
        }
        .timer-active { animation: timerGlow 2s ease-in-out infinite; }

        /* ── Chat scrollbar ── */
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,77,141,0.3); border-radius: 4px; }

        /* ── Input focus ── */
        .chat-input { outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .chat-input:focus {
          border-color: rgba(255,77,141,0.5) !important;
          box-shadow: 0 0 0 3px rgba(255,77,141,0.12);
        }

        /* ── Status badge ── */
        .badge-watch  { color: #4CAF50; background: rgba(76,175,80,0.1);  border: 1px solid rgba(76,175,80,0.2);  padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-notify { color: #FF9800; background: rgba(255,152,0,0.1);  border: 1px solid rgba(255,152,0,0.2);  padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-off    { color: #9E9E9E; background: rgba(158,158,158,0.08); border: 1px solid rgba(158,158,158,0.15); padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }

        /* ── Grid ── */
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .main-grid { grid-template-columns: 1fr; }
        }

        /* ── Emergency row ── */
        .emergency-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .emergency-row { grid-template-columns: 1fr 1fr; }
          .emergency-row > :first-child { grid-column: 1 / -1; }
        }

        /* ── Map grid lines ── */
        .map-grid-line { stroke: rgba(255,77,141,0.06); }

        /* ── GPS Standby animations ── */

        /* Radar sweep */
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .radar-sweep { animation: radarSweep 3s linear infinite; transform-origin: 50% 50%; }

        /* Concentric ring pulse */
        @keyframes ringPulse {
          0%   { opacity: 0.55; transform: scale(1); }
          70%  { opacity: 0.1;  transform: scale(1.55); }
          100% { opacity: 0;    transform: scale(1.7); }
        }
        .ring-1 { animation: ringPulse 2.6s ease-out infinite; }
        .ring-2 { animation: ringPulse 2.6s ease-out 0.65s infinite; }
        .ring-3 { animation: ringPulse 2.6s ease-out 1.3s infinite; }
        .ring-4 { animation: ringPulse 2.6s ease-out 1.95s infinite; }

        /* Core dot breathe */
        @keyframes coreBreathe {
          0%, 100% { box-shadow: 0 0 12px 4px rgba(255,77,141,0.55), 0 0 0 0 rgba(255,77,141,0.3); }
          50%       { box-shadow: 0 0 24px 8px rgba(255,77,141,0.8), 0 0 40px 12px rgba(194,24,91,0.25); }
        }
        .core-dot { animation: coreBreathe 2s ease-in-out infinite; }

        /* Status text cycle */
        @keyframes statusFade {
          0%, 18%  { opacity: 1; }
          25%, 93% { opacity: 0; }
          100%     { opacity: 0; }
        }
        @keyframes statusFade2 {
          0%, 24%   { opacity: 0; }
          32%, 57%  { opacity: 1; }
          65%, 100% { opacity: 0; }
        }
        @keyframes statusFade3 {
          0%, 62%   { opacity: 0; }
          70%, 90%  { opacity: 1; }
          98%, 100% { opacity: 0; }
        }
        .status-msg-1 { animation: statusFade  6s ease-in-out infinite; position: absolute; }
        .status-msg-2 { animation: statusFade2 6s ease-in-out infinite; position: absolute; }
        .status-msg-3 { animation: statusFade3 6s ease-in-out infinite; position: absolute; }

        /* Signal bar sequence */
        @keyframes barGrow {
          0%, 100% { opacity: 0.2; transform: scaleY(0.5); }
          50%      { opacity: 1;   transform: scaleY(1); }
        }
        .bar-1 { animation: barGrow 1.4s ease-in-out 0s    infinite; }
        .bar-2 { animation: barGrow 1.4s ease-in-out 0.2s  infinite; }
        .bar-3 { animation: barGrow 1.4s ease-in-out 0.4s  infinite; }
        .bar-4 { animation: barGrow 1.4s ease-in-out 0.6s  infinite; }

        /* Scanning line */
        @keyframes scanLine {
          0%   { top: 0%; opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-line { animation: scanLine 2.8s linear infinite; }

        /* Coordinate tick */
        @keyframes coordTick {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.85; }
        }
        .coord-tick { animation: coordTick 1.8s ease-in-out infinite; }

        /* Gradient border shimmer for GPS card */
        @keyframes borderShimmer {
          0%   { border-color: rgba(194,24,91,0.3); }
          50%  { border-color: rgba(255,128,171,0.5); }
          100% { border-color: rgba(194,24,91,0.3); }
        }
        .gps-card { animation: borderShimmer 3s ease-in-out infinite; }

        /* ── Section label ── */
        .section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          color: #FF80AB; text-transform: uppercase;
        }
      `}</style>

      {/* Background layers */}
      <div className="starfield" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "clamp(24px, 5vw, 56px) clamp(16px, 4vw, 32px)" }}>

        {/* ── Hero Header ── */}
        <header style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <span style={{ fontSize: "22px" }}>✦</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "3px", color: COLORS.accent, fontStyle: "italic" }}>Dhruv Tara · The Guiding Star</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 5.5vw, 58px)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: COLORS.text,
          }}>
            You're never walking{" "}
            <span style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #FF4D8D, #FF80AB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 18px rgba(255,77,141,0.4))",
            }}>
              alone.
            </span>
          </h1>
          <p style={{
            color: COLORS.textSoft,
            fontSize: "clamp(14px, 2vw, 17px)",
            maxWidth: "520px",
            marginTop: "14px",
            fontWeight: 400,
            lineHeight: 1.7,
            opacity: 0.85,
          }}>
            Your personal safety companion — real-time monitoring, AI-driven support, and an instant connection to your circle.
          </p>
        </header>

        {/* ── Main Grid ── */}
        <div className="main-grid">

          {/* ══ LEFT COLUMN ══ */}
          <section style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* Live Session Card */}
            <div className="card" style={{ padding: "36px" }}>
              {/* Card header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <span className="section-label">Live Session</span>
                <div style={{
                  display: "flex", alignItems: "center", gap: "7px",
                  background: sessionActive ? "rgba(76,175,80,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${sessionActive ? "rgba(76,175,80,0.25)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "20px", padding: "5px 12px",
                  transition: "all 0.4s ease",
                }}>
                  <div
                    className={sessionActive ? "dot" : ""}
                    style={{ width: "8px", height: "8px", borderRadius: "50%", background: sessionActive ? "#4CAF50" : "#555", flexShrink: 0 }}
                  />
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", color: sessionActive ? "#81C784" : "#777" }}>
                    {sessionActive ? "TRACKING" : "STANDBY"}
                  </span>
                </div>
              </div>

              {/* Timer display */}
              <div style={{ textAlign: "center", margin: "8px 0 28px" }}>
                <div
                  className={sessionActive ? "timer-active" : ""}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(56px, 10vw, 80px)",
                    fontWeight: 600,
                    color: sessionActive ? COLORS.secondary : "rgba(255,255,255,0.25)",
                    letterSpacing: "-2px",
                    lineHeight: 1,
                    transition: "color 0.5s ease",
                  }}
                >
                  {formatTime(elapsed)}
                </div>
                <div style={{ marginTop: "8px", fontSize: "12px", color: COLORS.textSoft, opacity: 0.5, letterSpacing: "1px" }}>
                  {sessionActive ? "TIME ELAPSED" : "READY TO START"}
                </div>
              </div>

              {/* Start/End button */}
              <button
                className="btn-primary"
                onClick={() => setSessionActive(!sessionActive)}
                style={{
                  width: "100%",
                  padding: "18px",
                  background: sessionActive
                    ? "linear-gradient(135deg, #7B1FA2, #C2185B)"
                    : "linear-gradient(135deg, #C2185B, #FF4D8D)",
                }}
              >
                {sessionActive ? "⏹ End Walk Session" : "▶ Start New Walk"}
              </button>
            </div>

            {/* Trusted Circle Card */}
            <div className="card" style={{ padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
                <span className="section-label">Trusted Circle</span>
                <span style={{ fontSize: "12px", color: COLORS.textSoft, opacity: 0.5 }}>
                  {CONTACTS.filter(c => c.status !== "Offline").length}/{CONTACTS.length} active
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {CONTACTS.map(c => (
                  <div
                    key={c.id}
                    style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "12px 14px",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "14px",
                      background: `linear-gradient(135deg, ${c.color}cc, ${c.color}55)`,
                      border: `1px solid ${c.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "13px", flexShrink: 0,
                      color: "white",
                    }}>
                      {c.initials}
                    </div>

                    {/* Name */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {c.name}
                      </div>
                    </div>

                    {/* Status badge */}
                    <span className={c.status === "Watching" ? "badge-watch" : c.status === "Notified" ? "badge-notify" : "badge-off"}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ RIGHT COLUMN ══ */}
          <section style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

            {/* ── GPS Card: Standby OR Active ── */}
            {/* DEMO NOTE: GPS Standby state is always shown when sessionActive=false.
                No real navigator.geolocation is needed. Remove `!sessionActive` condition for production. */}
            {!sessionActive ? (

              /* ════ GPS STANDBY STATE ════ */
              <div
                className="card gps-card"
                style={{
                  height: "310px",
                  position: "relative",
                  overflow: "hidden",
                  background: "rgba(20, 11, 30, 0.82)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0,
                }}
              >
                {/* Subtle inner vignette */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "28px", pointerEvents: "none",
                  background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(15,10,20,0.6) 100%)",
                  zIndex: 1,
                }} />

                {/* ── Top badge row ── */}
                <div style={{
                  position: "absolute", top: "18px", left: "18px", right: "18px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  zIndex: 3,
                }}>
                  {/* GPS Standby pill */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    background: "rgba(15,10,20,0.75)",
                    border: "1px solid rgba(255,77,141,0.25)",
                    backdropFilter: "blur(10px)",
                    padding: "6px 13px", borderRadius: "12px",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px",
                    color: COLORS.accent, textTransform: "uppercase",
                  }}>
                    <div className="dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF80AB", flexShrink: 0 }} />
                    GPS Standby
                  </div>

                  {/* Signal bars widget */}
                  <div style={{
                    display: "flex", alignItems: "flex-end", gap: "3px",
                    background: "rgba(15,10,20,0.7)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(8px)",
                    padding: "7px 11px", borderRadius: "12px",
                  }}>
                    {[10, 14, 18, 22].map((h, i) => (
                      <div
                        key={i}
                        className={`bar-${i + 1}`}
                        style={{
                          width: "4px", height: `${h}px`, borderRadius: "3px",
                          background: "linear-gradient(to top, #C2185B, #FF80AB)",
                          transformOrigin: "bottom",
                        }}
                      />
                    ))}
                    <span style={{ fontSize: "10px", color: COLORS.textSoft, opacity: 0.6, marginLeft: "5px", fontWeight: 600 }}>SIG</span>
                  </div>
                </div>

                {/* ── Radar SVG centrepiece ── */}
                <div style={{ position: "relative", width: "180px", height: "180px", zIndex: 2, flexShrink: 0 }}>
                  <svg viewBox="0 0 180 180" width="180" height="180" style={{ overflow: "visible" }}>
                    <defs>
                      <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="#C2185B" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#0F0A14" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="sweepGrad" cx="50%" cy="0%" r="100%" gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   stopColor="#FF4D8D" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#FF4D8D" stopOpacity="0" />
                      </radialGradient>
                      <clipPath id="radarClip">
                        <circle cx="90" cy="90" r="80" />
                      </clipPath>
                    </defs>

                    {/* Background fill */}
                    <circle cx="90" cy="90" r="80" fill="url(#radarBg)" />

                    {/* Concentric rings */}
                    {[20, 40, 60, 80].map((r, i) => (
                      <circle key={i} cx="90" cy="90" r={r}
                        fill="none" stroke="rgba(255,77,141,0.13)" strokeWidth="1"
                      />
                    ))}

                    {/* Cross-hair lines */}
                    <line x1="90" y1="10" x2="90" y2="170" stroke="rgba(255,77,141,0.1)" strokeWidth="1" />
                    <line x1="10" y1="90" x2="170" y2="90" stroke="rgba(255,77,141,0.1)" strokeWidth="1" />
                    <line x1="33" y1="33" x2="147" y2="147" stroke="rgba(255,77,141,0.06)" strokeWidth="1" />
                    <line x1="147" y1="33" x2="33" y2="147" stroke="rgba(255,77,141,0.06)" strokeWidth="1" />

                    {/* Scanning sweep */}
                    <g className="radar-sweep" clipPath="url(#radarClip)">
                      <path
                        d="M 90 90 L 90 10 A 80 80 0 0 1 147 33 Z"
                        fill="url(#sweepGrad)"
                        opacity="0.85"
                      />
                      {/* Sweep leading edge */}
                      <line x1="90" y1="90" x2="90" y2="10"
                        stroke="#FF4D8D" strokeWidth="1.5" opacity="0.9"
                      />
                    </g>

                    {/* Pulsing rings (CSS-animated, SVG circles) */}
                    <circle cx="90" cy="90" r="25" fill="none"
                      stroke="rgba(255,77,141,0.6)" strokeWidth="1.5"
                      className="ring-1"
                      style={{ transformOrigin: "90px 90px" }}
                    />
                    <circle cx="90" cy="90" r="25" fill="none"
                      stroke="rgba(255,77,141,0.45)" strokeWidth="1"
                      className="ring-2"
                      style={{ transformOrigin: "90px 90px" }}
                    />
                    <circle cx="90" cy="90" r="25" fill="none"
                      stroke="rgba(255,128,171,0.35)" strokeWidth="0.8"
                      className="ring-3"
                      style={{ transformOrigin: "90px 90px" }}
                    />

                    {/* Outer ring cap */}
                    <circle cx="90" cy="90" r="80"
                      fill="none" stroke="rgba(255,77,141,0.22)" strokeWidth="1.5"
                    />
                  </svg>

                  {/* Core glowing dot (HTML div for CSS box-shadow animation) */}
                  <div
                    className="core-dot"
                    style={{
                      position: "absolute",
                      top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "14px", height: "14px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF4D8D, #FF80AB)",
                      border: "2px solid rgba(255,200,220,0.7)",
                      zIndex: 4,
                    }}
                  />
                </div>

                {/* ── Status message block ── */}
                <div style={{
                  position: "relative",
                  height: "22px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "14px",
                  zIndex: 3,
                }}>
                  <span className="status-msg-1" style={{ fontSize: "13px", color: COLORS.accent, fontWeight: 500, letterSpacing: "0.3px" }}>
                    Fetching your live location…
                  </span>
                  <span className="status-msg-2" style={{ fontSize: "13px", color: COLORS.textSoft, fontWeight: 400, opacity: 0 }}>
                    Scanning satellite signals…
                  </span>
                  <span className="status-msg-3" style={{ fontSize: "13px", color: COLORS.accent, fontWeight: 500, opacity: 0 }}>
                    Waiting for GPS lock…
                  </span>
                </div>

                {/* ── Mock coordinate display ── */}
                <div style={{
                  display: "flex", gap: "16px", marginTop: "12px", zIndex: 3,
                }}>
                  {[
                    { label: "LAT", val: "28.61°N" },
                    { label: "LNG", val: "77.20°E" },
                    { label: "ACC", val: "— m" },
                  ].map(({ label, val }) => (
                    <div
                      key={label}
                      className="coord-tick"
                      style={{
                        textAlign: "center",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,77,141,0.12)",
                        borderRadius: "10px",
                        padding: "6px 12px",
                      }}
                    >
                      <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", color: COLORS.textSoft, opacity: 0.5, marginBottom: "3px" }}>
                        {label}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: COLORS.accent, fontFamily: "'Courier New', monospace" }}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Bottom hint ── */}
                <div style={{
                  position: "absolute", bottom: "16px",
                  display: "flex", alignItems: "center", gap: "6px",
                  zIndex: 3,
                  fontSize: "11px", color: COLORS.textSoft, opacity: 0.4, letterSpacing: "0.3px",
                }}>
                  <span>Start a session to begin live tracking</span>
                </div>
              </div>

            ) : (

              /* ════ GPS ACTIVE STATE ════ */
              <div className="card" style={{ height: "310px", position: "relative", overflow: "hidden" }}>
                {/* Map label */}
                <div style={{
                  position: "absolute", top: "18px", left: "18px", zIndex: 2,
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "rgba(15,10,20,0.75)",
                  border: "1px solid rgba(255,77,141,0.2)",
                  backdropFilter: "blur(8px)",
                  padding: "7px 14px", borderRadius: "12px",
                  fontSize: "12px", fontWeight: 500,
                }}>
                  <span>📍</span>
                  <span>Delhi NCR — Tracking</span>
                </div>

                {/* Distance badge */}
                <div style={{
                  position: "absolute", top: "18px", right: "18px", zIndex: 2,
                  background: "rgba(194,24,91,0.25)",
                  border: "1px solid rgba(255,77,141,0.3)",
                  backdropFilter: "blur(8px)",
                  padding: "7px 14px", borderRadius: "12px",
                  fontSize: "12px", fontWeight: 600, color: COLORS.accent,
                }}>
                  {(routeProgress * 0.18).toFixed(2)} km
                </div>

                <svg width="100%" height="100%">
                  {[20, 40, 60, 80].map(v => (
                    <React.Fragment key={v}>
                      <line x1={`${v}%`} y1="0%" x2={`${v}%`} y2="100%" className="map-grid-line" strokeWidth="1" />
                      <line x1="0%" y1={`${v}%`} x2="100%" y2={`${v}%`} className="map-grid-line" strokeWidth="1" />
                    </React.Fragment>
                  ))}
                  <path
                    d={`M ${ROUTE_POINTS.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                    fill="none" stroke="rgba(255,77,141,0.15)" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                  {routeProgress > 0 && (
                    <path
                      d={`M ${ROUTE_POINTS.slice(0, routeProgress + 1).map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                      fill="none" stroke="url(#routeGrad2)" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  )}
                  <defs>
                    <linearGradient id="routeGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C2185B" />
                      <stop offset="100%" stopColor="#FF80AB" />
                    </linearGradient>
                    <radialGradient id="pulseGrad2">
                      <stop offset="0%" stopColor="#FF4D8D" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FF4D8D" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {ROUTE_POINTS.map((p, i) => (
                    <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="3"
                      fill={i <= routeProgress ? "rgba(255,77,141,0.8)" : "rgba(255,255,255,0.12)"}
                      style={{ transition: "fill 0.4s" }}
                    />
                  ))}
                  <circle cx={`${ROUTE_POINTS[routeProgress].x}%`} cy={`${ROUTE_POINTS[routeProgress].y}%`}
                    r="18" fill="url(#pulseGrad2)" className="dot"
                  />
                  <circle cx={`${ROUTE_POINTS[routeProgress].x}%`} cy={`${ROUTE_POINTS[routeProgress].y}%`}
                    r="7" fill="#FF4D8D" style={{ filter: "drop-shadow(0 0 6px #FF4D8D)" }}
                  />
                  <circle cx={`${ROUTE_POINTS[routeProgress].x}%`} cy={`${ROUTE_POINTS[routeProgress].y}%`}
                    r="3" fill="white"
                  />
                </svg>
              </div>
            )}

            {/* AI Companion Chat */}
            <div className="card" style={{ padding: "24px", display: "flex", flexDirection: "column", height: "420px" }}>
              {/* Chat header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "18px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "16px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "12px",
                  background: "linear-gradient(135deg, #C2185B, #FF80AB)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0,
                  boxShadow: "0 0 16px rgba(255,77,141,0.3)",
                }}>
                  🌟
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>Tara</div>
                  <div style={{ fontSize: "11px", color: "#4CAF50", display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#4CAF50" }} />
                    Always active
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                className="chat-scroll"
                style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", paddingRight: "4px" }}
              >
                {messages.map(m => (
                  <div
                    key={m.id}
                    className="fade-up"
                    style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", maxWidth: "82%" }}
                  >
                    <div style={{
                      background: m.from === "user"
                        ? "linear-gradient(135deg, #C2185B, #FF4D8D)"
                        : "rgba(255,255,255,0.055)",
                      border: m.from === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                      padding: "12px 16px",
                      borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      fontSize: "13.5px",
                      lineHeight: "1.55",
                      color: COLORS.text,
                      boxShadow: m.from === "user" ? "0 4px 16px rgba(194,24,91,0.25)" : "none",
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input row */}
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                <input
                  className="chat-input"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage(inputText)}
                  placeholder="Talk to Tara…"
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    padding: "13px 16px",
                    color: COLORS.text,
                    fontSize: "14px",
                  }}
                />
                <button
                  className="btn-primary"
                  onClick={() => sendMessage(inputText)}
                  style={{ width: "48px", flexShrink: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}
                >
                  ➤
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* ── Emergency Actions ── */}
        <div
          className="card"
          style={{
            marginTop: "28px",
            padding: "32px",
            background: "rgba(194,24,91,0.05)",
            borderColor: "rgba(194,24,91,0.25)",
            boxShadow: "0 4px 30px rgba(194,24,91,0.1), inset 0 1px 0 rgba(255,77,141,0.08)",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF4D8D", boxShadow: "0 0 8px #FF4D8D" }} className="dot" />
            <span className="section-label">Emergency Actions</span>
          </div>

          <div className="emergency-row">
            <button
              className={`btn-sos${sosActive ? " sos-anim" : ""}`}
              onClick={triggerSOS}
              style={{ padding: "22px 16px" }}
            >
              🆘 TRIGGER SOS
            </button>
            <button
              className="btn-ghost"
              onClick={() => sendMessage("📞 Calling fake number...")}
              style={{ padding: "18px 14px" }}
            >
              📞 Fake Call
            </button>
            <button
              className="btn-ghost"
              onClick={() => sendMessage("📡 Sharing live GPS data...")}
              style={{ padding: "18px 14px" }}
            >
              📡 Share GPS
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", marginTop: "32px", fontSize: "12px", color: COLORS.textSoft, opacity: 0.35, letterSpacing: "0.5px" }}>
          Dhruv Tara · Your safety, always our priority ✦
        </p>
      </div>
    </div>
  );
}