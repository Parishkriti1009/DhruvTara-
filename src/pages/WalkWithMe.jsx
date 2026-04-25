import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


// --- Theme & Data ---
const COLORS = {
  bg: "#050816",
  bgDeep: "#0B0F2A",
  bgCard: "rgba(11, 15, 42, 0.75)",
  bgCardAlt: "rgba(26, 16, 61, 0.6)",
  border: "rgba(255, 46, 136, 0.18)",
  borderSubtle: "rgba(160, 120, 255, 0.12)",
  primary: "#FF2E88",
  primaryGlow: "rgba(255, 46, 136, 0.35)",
  secondary: "#FF4D9D",
  accent: "#C084FC",
  accentSoft: "rgba(192, 132, 252, 0.15)",
  text: "#EAEAF0",
  textSoft: "#A0A3B1",
  textMuted: "#6B6F85",
  success: "#34D399",
  live: "#FF4D9D",
};


const CONTACTS = [
  { id: 1, name: "Priya Sharma", initials: "PS", status: "Watching", color: "#FF2E88", statusColor: "#34D399" },
  { id: 2, name: "Ananya Iyer", initials: "AI", status: "Notified", color: "#C084FC", statusColor: "#FBBF24" },
  { id: 3, name: "Ritu Malhotra", initials: "RM", status: "Offline", color: "#7C3AED", statusColor: "#6B6F85" },
  { id: 4, name: "Kavya Nair", initials: "KN", status: "Watching", color: "#FF4D9D", statusColor: "#34D399" },
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
  const navigate = useNavigate();
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
    window.dispatchEvent(new CustomEvent('start-sos-capture'));
    setTimeout(() => {
      setSosActive(false);
      navigate("/capture");
    }, 800);
  };


  return (
    <div style={{
      background: `radial-gradient(ellipse at 70% 10%, #1A103D 0%, #0B0F2A 45%, #050816 100%)`,
      minHeight: "100vh",
      color: COLORS.text,
      fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;1,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }


        /* Starfield */
        .starfield-wwm {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
        }
        .starfield-wwm::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 23% 5%, rgba(255,200,230,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 41% 18%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 57% 8%, rgba(200,180,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 72% 22%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 88% 6%, rgba(255,200,230,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 35%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 42%, rgba(200,180,255,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 92% 38%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 55%, rgba(255,200,230,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 60%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 5% 70%, rgba(200,180,255,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 48% 78%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 85%, rgba(255,200,230,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 30% 90%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 95%, rgba(200,180,255,0.9) 0%, transparent 100%);
        }


        /* Nebula orbs */
        .nebula-orb {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          filter: blur(100px);
        }
        .nebula-1 {
          width: 600px; height: 600px; top: -180px; right: -160px;
          background: radial-gradient(circle, rgba(255, 46, 136, 0.12) 0%, rgba(120, 40, 200, 0.08) 50%, transparent 70%);
        }
        .nebula-2 {
          width: 400px; height: 400px; bottom: -100px; left: -100px;
          background: radial-gradient(circle, rgba(96, 40, 200, 0.1) 0%, rgba(26, 16, 61, 0.05) 60%, transparent 80%);
        }
        .nebula-3 {
          width: 300px; height: 300px; top: 40%; left: 40%;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.06) 0%, transparent 70%);
        }


        /* Glass Cards */
        .glass-card {
          background: rgba(11, 15, 42, 0.72);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 46, 136, 0.14);
          border-radius: 24px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          border-color: rgba(255, 46, 136, 0.28);
          box-shadow: 0 0 32px rgba(255, 46, 136, 0.06), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .glass-card-purple {
          background: rgba(26, 16, 61, 0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(160, 120, 255, 0.15);
          border-radius: 24px;
        }


        /* Buttons */
        .btn-start {
          background: linear-gradient(135deg, #C2185B 0%, #FF2E88 50%, #FF4D9D 100%);
          border: none;
          border-radius: 14px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 24px rgba(255, 46, 136, 0.3), 0 1px 0 rgba(255,255,255,0.15) inset;
          position: relative;
          overflow: hidden;
        }
        .btn-start::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%);
          border-radius: inherit;
          pointer-events: none;
        }
        .btn-start:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255, 46, 136, 0.45), 0 1px 0 rgba(255,255,255,0.2) inset;
        }
        .btn-start:active { transform: translateY(0px); }


        .btn-ghost-wwm {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          color: #A0A3B1;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.2px;
        }
        .btn-ghost-wwm:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          color: #EAEAF0;
          transform: translateY(-1px);
        }


        .btn-sos {
          background: linear-gradient(135deg, #B01050 0%, #FF2E88 60%, #FF4D9D 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.8px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 6px 32px rgba(255, 46, 136, 0.4);
          position: relative;
          overflow: hidden;
        }
        .btn-sos::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .btn-sos:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(255, 46, 136, 0.6);
        }


        /* SOS pulse animation */
        .sos-active {
          animation: sosPulseNew 0.6s ease-in-out infinite alternate;
        }
        @keyframes sosPulseNew {
          0% { box-shadow: 0 6px 32px rgba(255,46,136,0.4); }
          100% { box-shadow: 0 0 0 12px rgba(255,46,136,0.15), 0 6px 48px rgba(255,46,136,0.7); transform: scale(1.01); }
        }


        /* Radar animation */
        .radar-sweep-new { animation: radarNew 3s linear infinite; transform-origin: 50% 50%; }
        @keyframes radarNew { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }


        /* Live pulse dot */
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #34D399;
          animation: livePulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.5); }
          50% { box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
        }


        /* Status fade */
        .status-fade-1 { animation: sfade1 6s infinite; position: absolute; }
        .status-fade-2 { animation: sfade2 6s infinite; position: absolute; opacity: 0; }
        @keyframes sfade1 { 0%,20%{opacity:1} 25%,100%{opacity:0} }
        @keyframes sfade2 { 0%,25%{opacity:0} 30%,55%{opacity:1} 60%,100%{opacity:0} }


        /* Tag pill */
        .tag-pill {
          font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
          color: #C084FC; text-transform: uppercase;
          display: flex; align-items: center; gap: 6px;
        }


        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,46,136,0.25); border-radius: 4px; }


        /* Chat input */
        .chat-input-wwm {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 11px 16px;
          color: #EAEAF0;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .chat-input-wwm::placeholder { color: #6B6F85; }
        .chat-input-wwm:focus { border-color: rgba(255,46,136,0.4); }


        /* Hover contact row */
        .contact-row {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.03);
          padding: 10px 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.04);
          transition: all 0.2s ease;
          cursor: default;
        }
        .contact-row:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,46,136,0.15);
        }


        /* Timer display shimmer when active */
        .timer-active { color: #FF4D9D; text-shadow: 0 0 40px rgba(255,77,157,0.4); }
        .timer-idle { color: rgba(255,255,255,0.15); }


        @media (max-width: 768px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .action-grid { grid-template-columns: 1fr !important; }
          .header-title { font-size: 32px !important; }
        }
      `}</style>


      {/* Background layers */}
      <div className="starfield-wwm" />
      <div className="nebula-orb nebula-1" />
      <div className="nebula-orb nebula-2" />
      <div className="nebula-orb nebula-3" />


      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 64px" }}>


        {/* Header */}
        <header style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div className="live-dot" />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: COLORS.textMuted, textTransform: "uppercase" }}>
              Safety Companion Active
            </span>
          </div>
          <h1 className="header-title" style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "52px",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            color: COLORS.text,
          }}>
            You're never walking{" "}
            <span style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #FF2E88, #FF80C0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              alone.
            </span>
          </h1>
          <p style={{ marginTop: "12px", fontSize: "15px", color: COLORS.textSoft, fontWeight: 400, maxWidth: "480px", lineHeight: 1.6 }}>
            Your trusted circle is watching in real time. Stay connected, stay safe.
          </p>
        </header>


        {/* Main Grid */}
        <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>


          {/* === LEFT COLUMN === */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>


            {/* Live Session Card */}
            <div className="glass-card" style={{ padding: "32px" }}>
              <div className="tag-pill" style={{ marginBottom: "20px" }}>
                <div className="live-dot" />
                Live Session
              </div>


              {/* Timer */}
              <div style={{
                fontSize: "80px",
                textAlign: "center",
                margin: "8px 0 24px",
                fontFamily: "'Inter', monospace",
                fontWeight: 300,
                letterSpacing: "-2px",
                lineHeight: 1,
                transition: "all 0.4s ease",
              }} className={sessionActive ? "timer-active" : "timer-idle"}>
                {formatTime(elapsed)}
              </div>


              {/* Status bar */}
              {sessionActive && (
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  marginBottom: "20px",
                  background: "rgba(52, 211, 153, 0.08)",
                  border: "1px solid rgba(52, 211, 153, 0.2)",
                  borderRadius: "10px",
                  padding: "8px 16px",
                }}>
                  <div className="live-dot" />
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "#34D399", letterSpacing: "0.5px" }}>
                    GPS Locked · Contacts Notified
                  </span>
                </div>
              )}


              <button
                className="btn-start"
                onClick={() => setSessionActive(!sessionActive)}
                style={{ width: "100%", padding: "16px 20px" }}
              >
                {sessionActive ? "⏹  End Walk Session" : "▶  Start New Walk"}
              </button>
            </div>


            {/* Trusted Circle Card */}
            <div className="glass-card-purple" style={{ padding: "28px" }}>
              <div className="tag-pill" style={{ marginBottom: "20px", color: COLORS.accent }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="4" r="2.5" stroke="#C084FC" strokeWidth="1.2"/>
                  <path d="M1 10.5C1 8.5 2.8 7 6 7s5 1.5 5 3.5" stroke="#C084FC" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Trusted Circle
              </div>


              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {CONTACTS.map(c => (
                  <div key={c.id} className="contact-row">
                    {/* Avatar */}
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "11px",
                      background: `linear-gradient(135deg, ${c.color}55, ${c.color}22)`,
                      border: `1px solid ${c.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700", fontSize: "12px", color: c.color,
                      flexShrink: 0,
                    }}>
                      {c.initials}
                    </div>
                    <span style={{ flex: 1, fontSize: "14px", fontWeight: 500, color: COLORS.text }}>{c.name}</span>
                    {/* Status badge */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      background: `${c.statusColor}15`,
                      border: `1px solid ${c.statusColor}30`,
                      borderRadius: "8px",
                      padding: "3px 10px",
                    }}>
                      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.statusColor, flexShrink: 0 }} />
                      <span style={{ fontSize: "11px", fontWeight: 500, color: c.statusColor }}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* === RIGHT COLUMN === */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>


            {/* Map / Satellite Card */}
            <div className="glass-card" style={{
              height: "300px",
              position: "relative",
              overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* Card header */}
              <div style={{
                position: "absolute", top: "20px", left: "24px", right: "24px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                zIndex: 2,
              }}>
                <div className="tag-pill">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="#C084FC" strokeWidth="1.2"/>
                    <circle cx="5" cy="5" r="1.5" fill="#C084FC"/>
                  </svg>
                  {sessionActive ? "Live Route" : "Satellite Status"}
                </div>
                {sessionActive && (
                  <div style={{
                    fontSize: "10px", fontWeight: 600, color: "#34D399",
                    background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)",
                    borderRadius: "6px", padding: "3px 8px", letterSpacing: "0.8px",
                  }}>LIVE</div>
                )}
              </div>


              {/* Content */}
              {!sessionActive ? (
                <>
                  {/* Radar rings */}
                  {[80, 60, 40, 20].map((r, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      width: `${r * 2}px`, height: `${r * 2}px`,
                      borderRadius: "50%",
                      border: `1px solid rgba(192,132,252,${0.06 + i * 0.03})`,
                    }} />
                  ))}
                  <svg width="180" height="180" viewBox="0 0 180 180" style={{ position: "absolute" }}>
                    <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(192,132,252,0.12)" strokeWidth="1" />
                    <circle cx="90" cy="90" r="60" fill="none" stroke="rgba(192,132,252,0.08)" strokeWidth="1" />
                    <circle cx="90" cy="90" r="40" fill="none" stroke="rgba(192,132,252,0.1)" strokeWidth="1" />
                    {/* Cross hairs */}
                    <line x1="90" y1="10" x2="90" y2="170" stroke="rgba(192,132,252,0.07)" strokeWidth="1" />
                    <line x1="10" y1="90" x2="170" y2="90" stroke="rgba(192,132,252,0.07)" strokeWidth="1" />
                    {/* Sweep */}
                    <g className="radar-sweep-new">
                      <path d="M 90 90 L 90 10 A 80 80 0 0 1 147 33 Z"
                        fill="url(#sweepGrad)" opacity="0.5" />
                      <defs>
                        <radialGradient id="sweepGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(90,90) scale(80)">
                          <stop offset="0%" stopColor="#FF2E88" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#FF2E88" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </g>
                    {/* Center dot */}
                    <circle cx="90" cy="90" r="4" fill="#FF2E88" opacity="0.9" />
                    <circle cx="90" cy="90" r="8" fill="rgba(255,46,136,0.2)" />
                  </svg>
                  {/* Status text */}
                  <div style={{ position: "absolute", bottom: "24px", textAlign: "center", width: "100%" }}>
                    <div className="status-fade-1" style={{ left: 0, right: 0 }}>
                      <span style={{ fontSize: "11px", color: COLORS.textMuted, letterSpacing: "1px" }}>Scanning satellite signals...</span>
                    </div>
                    <div className="status-fade-2" style={{ left: 0, right: 0 }}>
                      <span style={{ fontSize: "11px", color: COLORS.textMuted, letterSpacing: "1px" }}>Calibrating location...</span>
                    </div>
                  </div>
                </>
              ) : (
                // Live route map
                <svg width="100%" height="100%" style={{ background: "transparent" }}>
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF2E88" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FF4D9D" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="dotGlow">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  {/* Grid lines */}
                  {[20, 40, 60, 80].map(v => (
                    <React.Fragment key={v}>
                      <line x1={`${v}%`} y1="0%" x2={`${v}%`} y2="100%" stroke="rgba(192,132,252,0.05)" strokeWidth="1" />
                      <line x1="0%" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="rgba(192,132,252,0.05)" strokeWidth="1" />
                    </React.Fragment>
                  ))}
                  {/* Route trail */}
                  <path
                    d={`M ${ROUTE_POINTS.map(p => `${p.x}% ${p.y}%`).join(' L ')}`}
                    fill="none" stroke="url(#routeGrad)" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="6 3" opacity="0.6"
                  />
                  {/* Past waypoints */}
                  {ROUTE_POINTS.slice(0, routeProgress).map((p, i) => (
                    <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="3"
                      fill="rgba(255,46,136,0.4)" />
                  ))}
                  {/* Current position */}
                  <circle cx={`${ROUTE_POINTS[routeProgress].x}%`} cy={`${ROUTE_POINTS[routeProgress].y}%`}
                    r="14" fill="rgba(255,46,136,0.12)" />
                  <circle cx={`${ROUTE_POINTS[routeProgress].x}%`} cy={`${ROUTE_POINTS[routeProgress].y}%`}
                    r="7" fill="#FF2E88" filter="url(#dotGlow)" />
                  <circle cx={`${ROUTE_POINTS[routeProgress].x}%`} cy={`${ROUTE_POINTS[routeProgress].y}%`}
                    r="3" fill="white" />
                </svg>
              )}
            </div>


            {/* Chat Card */}
            <div className="glass-card" style={{
              flex: 1, display: "flex", flexDirection: "column",
              minHeight: "380px", padding: "24px",
            }}>
              {/* Chat header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #FF2E88, #C084FC)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px",
                }}>💗</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: COLORS.text }}>Tara</div>
                  <div style={{ fontSize: "11px", color: COLORS.success, display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: COLORS.success }} />
                    Always online
                  </div>
                </div>
              </div>


              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                {messages.map(m => (
                  <div key={m.id} style={{
                    alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                    background: m.from === "user"
                      ? "linear-gradient(135deg, #B01050, #FF2E88)"
                      : "rgba(255,255,255,0.05)",
                    border: m.from === "user"
                      ? "none"
                      : "1px solid rgba(255,255,255,0.07)",
                    padding: "10px 14px",
                    borderRadius: m.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    maxWidth: "82%",
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                    color: COLORS.text,
                    boxShadow: m.from === "user" ? "0 2px 16px rgba(255,46,136,0.25)" : "none",
                  }}>
                    {m.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>


              {/* Input */}
              <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                <input
                  className="chat-input-wwm"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                  placeholder="Talk to Tara..."
                />
                <button
                  onClick={() => sendMessage(inputText)}
                  style={{
                    background: "linear-gradient(135deg, #C2185B, #FF2E88)",
                    border: "none",
                    color: "white",
                    borderRadius: "12px",
                    padding: "0 18px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "13px",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 12px rgba(255,46,136,0.3)",
                    flexShrink: 0,
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* === Action Row === */}
        <div className="action-grid" style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "14px",
        }}>
          {/* SOS */}
          <button
            className={`btn-sos ${sosActive ? "sos-active" : ""}`}
            onClick={triggerSOS}
            style={{ padding: "20px 24px", textAlign: "left", display: "flex", alignItems: "center", gap: "14px" }}
          >
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", flexShrink: 0,
            }}>🆘</div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.5px" }}>TRIGGER SOS</div>
              <div style={{ fontSize: "11px", fontWeight: 400, opacity: 0.75, marginTop: "2px" }}>Alert all contacts immediately</div>
            </div>
          </button>


          {/* Fake Call */}
          <button className="btn-ghost-wwm" style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "22px" }}>📞</span>
            <span style={{ fontSize: "12px", letterSpacing: "0.3px" }}>Fake Call</span>
          </button>


          {/* Share GPS */}
          <button className="btn-ghost-wwm" style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "22px" }}>📡</span>
            <span style={{ fontSize: "12px", letterSpacing: "0.3px" }}>Share Live GPS</span>
          </button>
        </div>


        {/* Footer note */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: COLORS.textMuted, letterSpacing: "0.5px" }}>
            End-to-end encrypted · Location shared only with your trusted circle
          </p>
        </div>
      </div>
    </div>
  );
}

