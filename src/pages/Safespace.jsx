import { useState } from "react";


const safeplacesData = {
  police: [
    { id: 1, name: "Central Police Station", distance: "0.4 km", status: "24x7", badge: "Verified", phone: "100", address: "MG Road, Sector 14" },
    { id: 2, name: "Women Help Desk – North", distance: "1.2 km", status: "24x7", badge: "Safe", phone: "1091", address: "Civil Lines, Block B" },
    { id: 3, name: "Traffic Police Post", distance: "2.1 km", status: "Open", badge: "Verified", phone: "103", address: "Ring Road Junction" },
  ],
  hospital: [
    { id: 4, name: "City General Hospital", distance: "0.8 km", status: "24x7", badge: "Safe", phone: "102", address: "Nehru Nagar, Gate 2" },
    { id: 5, name: "Sunrise Women's Clinic", distance: "1.5 km", status: "Open", badge: "Verified", phone: "011-45671234", address: "Lajpat Colony, 3rd Floor" },
    { id: 6, name: "Apollo Emergency Care", distance: "3.0 km", status: "24x7", badge: "Safe", phone: "1066", address: "DLF Phase 2, Main Gate" },
  ],
  shop: [
    { id: 7, name: "Café Beacon – Women Safe Zone", distance: "0.3 km", status: "Open", badge: "Safe", phone: "011-98765432", address: "Connaught Place, Inner Circle" },
    { id: 8, name: "Star Bazaar (Refuge Point)", distance: "0.9 km", status: "Open", badge: "Verified", phone: "011-11223344", address: "Sector 18 Market" },
    { id: 9, name: "24hr FoodMart", distance: "1.7 km", status: "24x7", badge: "Safe", phone: "011-55667788", address: "Model Town, Lane 5" },
  ],
  transport: [
    { id: 10, name: "Metro Station – Blue Line", distance: "0.5 km", status: "24x7", badge: "Verified", phone: "155370", address: "Rajiv Chowk Underground" },
    { id: 11, name: "Women's Bus Shelter", distance: "1.1 km", status: "Open", badge: "Safe", phone: "1800111222", address: "Janpath Bus Stand" },
    { id: 12, name: "Pre-Paid Taxi Counter", distance: "1.8 km", status: "24x7", badge: "Verified", phone: "011-43215678", address: "ISBT Kashmere Gate" },
  ],
};


const categories = [
  { key: "police", label: "Police Stations", icon: "🚔", color: "#FF4D8D" },
  { key: "hospital", label: "Hospitals", icon: "🏥", color: "#FF80AB" },
  { key: "shop", label: "Shops / Cafés", icon: "☕", color: "#E91E8C" },
  { key: "transport", label: "Transport Points", icon: "🚇", color: "#AD1457" },
];


const savedInitial = {};


export default function SafeSpace() {
  const [activeCategory, setActiveCategory] = useState("police");
  const [searchValue, setSearchValue] = useState("");
  const [saved, setSaved] = useState(savedInitial);
  const [navigating, setNavigating] = useState(null);


  const places = safeplacesData[activeCategory] || [];
  const filtered = places.filter(
    (p) =>
      p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.address.toLowerCase().includes(searchValue.toLowerCase())
  );


  const toggleSave = (id) => setSaved((prev) => ({ ...prev, [id]: !prev[id] }));


  const handleNavigate = (id) => {
    setNavigating(id);
    setTimeout(() => setNavigating(null), 1800);
  };


  return (
    <div style={styles.root}>
      {/* Starry background */}
      <div style={styles.stars} aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.star,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>


      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>SafeSpace</h1>
            <p style={styles.subtitle}>Dhruv Tara – The Guiding Star</p>
          </div>
        </div>


        {/* Search */}
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>📍</span>
          <input
            type="text"
            placeholder="Find safe places near you…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 0 2px #FF4D8D88, 0 0 20px #FF4D8D44";
              e.target.style.borderColor = "#FF4D8D";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "none";
              e.target.style.borderColor = "#2E1A3A";
            }}
          />
          {searchValue && (
            <button onClick={() => setSearchValue("")} style={styles.clearBtn}>✕</button>
          )}
        </div>


        {/* Location Banner */}
        <div style={styles.locationBanner}>
          <span style={{ fontSize: 13 }}>📡</span>
          <span style={styles.locationText}>Detecting your location… <strong style={{ color: "#FF80AB" }}>New Delhi, India</strong></span>
          <span style={styles.locationDot} />
        </div>


        {/* Categories */}
        <div style={styles.categoryRow}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                ...styles.catBtn,
                ...(activeCategory === cat.key ? styles.catBtnActive : {}),
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.key) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "#FF4D8D66";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.key) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#2E1A3A";
                }
              }}
            >
              <span style={styles.catIcon}>{cat.icon}</span>
              <span style={styles.catLabel}>{cat.label}</span>
            </button>
          ))}
        </div>


        {/* Results header */}
        <div style={styles.resultsHeader}>
          <span style={styles.resultsTitle}>
            {categories.find((c) => c.key === activeCategory)?.label}
          </span>
          <span style={styles.resultsBadge}>{filtered.length} nearby</span>
        </div>


        {/* Cards */}
        <div style={styles.cardList}>
          {filtered.length === 0 && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
              <p style={{ color: "#F8BBD0", fontSize: 14 }}>No results found for "{searchValue}"</p>
            </div>
          )}
          {filtered.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              saved={!!saved[place.id]}
              onSave={() => toggleSave(place.id)}
              navigating={navigating === place.id}
              onNavigate={() => handleNavigate(place.id)}
            />
          ))}
        </div>


        {/* Emergency strip */}
        <div style={styles.emergencyStrip}>
          <span style={styles.emergencyPulse} />
          <span style={{ color: "#FCE4EC", fontSize: 13, fontWeight: 600 }}>Emergency?</span>
          <a href="tel:112" style={styles.emergencyBtn}>📞 Call 112</a>
          <a href="tel:1091" style={styles.emergencyBtnAlt}>👩 Women Helpline 1091</a>
        </div>
      </div>


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0F0A14; }
      `}</style>
    </div>
  );
}


function PlaceCard({ place, saved, onSave, navigating, onNavigate }) {
  const [hovered, setHovered] = useState(false);


  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 40px #C2185B33, 0 2px 12px #00000044"
          : "0 2px 16px #00000033",
        borderColor: hovered ? "#C2185B55" : "#2E1A3A",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div style={styles.cardTop}>
        <div style={styles.cardLeft}>
          <h3 style={styles.cardName}>{place.name}</h3>
          <p style={styles.cardAddress}>📍 {place.address}</p>
        </div>
        <div style={styles.cardRight}>
          <span style={place.status === "24x7" ? styles.status24 : styles.statusOpen}>
            {place.status === "24x7" ? "🟢 24×7" : "🟡 Open"}
          </span>
        </div>
      </div>


      {/* Meta row */}
      <div style={styles.cardMeta}>
        <span style={styles.distance}>🚶 {place.distance}</span>
        <span style={place.badge === "Verified" ? styles.badgeVerified : styles.badgeSafe}>
          {place.badge === "Verified" ? "✓ Verified" : "🛡 Safe"}
        </span>
      </div>


      {/* Actions */}
      <div style={styles.cardActions}>
        <button
          onClick={onNavigate}
          style={{
            ...styles.actionBtn,
            background: navigating
              ? "linear-gradient(135deg, #FF80AB, #FF4D8D)"
              : "linear-gradient(135deg, #C2185B, #FF4D8D)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 16px #FF4D8D66"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          {navigating ? "📡 Routing…" : "🗺 Navigate"}
        </button>


        <a
          href={`tel:${place.phone}`}
          style={styles.actionBtnOutline}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#C2185B22";
            e.currentTarget.style.borderColor = "#FF4D8D";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#C2185B66";
          }}
        >
          📞 Call
        </a>


        <button
          onClick={onSave}
          style={{
            ...styles.actionBtnOutline,
            borderColor: saved ? "#FF80AB" : "#C2185B66",
            color: saved ? "#FF80AB" : "#F8BBD0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF80AB22";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {saved ? "💖 Saved" : "🤍 Save"}
        </button>
      </div>
    </div>
  );
}


const styles = {
  root: {
    minHeight: "100vh",
    background: "#0F0A14",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflowX: "hidden",
    paddingBottom: 40,
  },
  stars: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  star: {
    position: "absolute",
    borderRadius: "50%",
    background: "#FCE4EC",
    animation: "twinkle ease-in-out infinite",
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: 680,
    margin: "0 auto",
    padding: "32px 16px 24px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
  },
  headerIcon: {
    fontSize: 36,
    filter: "drop-shadow(0 0 12px #FF4D8D)",
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 32,
    fontWeight: 700,
    color: "#FCE4EC",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "#FF80AB",
    letterSpacing: "0.08em",
    marginTop: 2,
    fontWeight: 500,
  },
  searchWrap: {
    position: "relative",
    marginBottom: 12,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 16,
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    background: "#1A1224",
    border: "1.5px solid #2E1A3A",
    borderRadius: 16,
    padding: "14px 44px 14px 46px",
    color: "#FCE4EC",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    caretColor: "#FF4D8D",
  },
  clearBtn: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#F8BBD0",
    cursor: "pointer",
    fontSize: 13,
    padding: 4,
  },
  locationBanner: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#1A1224",
    border: "1px solid #2E1A3A",
    borderRadius: 12,
    padding: "9px 14px",
    marginBottom: 24,
    fontSize: 13,
    color: "#F8BBD0",
  },
  locationText: {
    flex: 1,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4CAF50",
    animation: "pulse-dot 2s ease-in-out infinite",
  },
  categoryRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
    marginBottom: 24,
  },
  catBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#1A1224",
    border: "1.5px solid #2E1A3A",
    borderRadius: 14,
    padding: "12px 16px",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#F8BBD0",
    textAlign: "left",
  },
  catBtnActive: {
    background: "linear-gradient(135deg, #C2185B22, #FF4D8D11)",
    borderColor: "#C2185B",
    boxShadow: "0 0 20px #C2185B33",
  },
  catIcon: {
    fontSize: 20,
  },
  catLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: "#FCE4EC",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FCE4EC",
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "0.02em",
  },
  resultsBadge: {
    background: "linear-gradient(135deg, #C2185B, #FF4D8D)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 20,
    padding: "3px 10px",
    letterSpacing: "0.03em",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginBottom: 24,
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 20px",
    background: "#1A1224",
    borderRadius: 20,
    border: "1px solid #2E1A3A",
  },
  card: {
    background: "#1A1224",
    border: "1.5px solid #2E1A3A",
    borderRadius: 20,
    padding: "18px 18px 14px",
    transition: "all 0.25s",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },
  cardLeft: {
    flex: 1,
    minWidth: 0,
  },
  cardRight: {
    flexShrink: 0,
  },
  cardName: {
    fontSize: 15,
    fontWeight: 600,
    color: "#FCE4EC",
    marginBottom: 4,
    lineHeight: 1.3,
  },
  cardAddress: {
    fontSize: 12,
    color: "#F8BBD0",
    opacity: 0.75,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  status24: {
    fontSize: 11,
    fontWeight: 600,
    color: "#69F0AE",
    background: "#1B5E2022",
    border: "1px solid #69F0AE44",
    borderRadius: 20,
    padding: "3px 9px",
    whiteSpace: "nowrap",
  },
  statusOpen: {
    fontSize: 11,
    fontWeight: 600,
    color: "#FFD54F",
    background: "#F57F1722",
    border: "1px solid #FFD54F44",
    borderRadius: 20,
    padding: "3px 9px",
    whiteSpace: "nowrap",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  distance: {
    fontSize: 12,
    color: "#FF80AB",
    fontWeight: 500,
  },
  badgeVerified: {
    fontSize: 11,
    color: "#FF4D8D",
    background: "#C2185B18",
    border: "1px solid #C2185B55",
    borderRadius: 20,
    padding: "2px 9px",
    fontWeight: 600,
  },
  badgeSafe: {
    fontSize: 11,
    color: "#FF80AB",
    background: "#FF80AB18",
    border: "1px solid #FF80AB55",
    borderRadius: 20,
    padding: "2px 9px",
    fontWeight: 600,
  },
  cardActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  actionBtn: {
    background: "linear-gradient(135deg, #C2185B, #FF4D8D)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "box-shadow 0.2s, transform 0.15s",
    letterSpacing: "0.02em",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
  actionBtnOutline: {
    background: "transparent",
    color: "#F8BBD0",
    border: "1.5px solid #C2185B66",
    borderRadius: 10,
    padding: "7px 14px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
  emergencyStrip: {
    background: "linear-gradient(135deg, #1A1224, #2A0A1A)",
    border: "1.5px solid #C2185B66",
    borderRadius: 16,
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 0 30px #C2185B22",
  },
  emergencyPulse: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#FF4D8D",
    flexShrink: 0,
    animation: "pulse-dot 1.5s ease-in-out infinite",
    boxShadow: "0 0 8px #FF4D8D",
  },
  emergencyBtn: {
    background: "linear-gradient(135deg, #C2185B, #FF4D8D)",
    color: "#fff",
    borderRadius: 10,
    padding: "7px 14px",
    fontSize: 12,
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    letterSpacing: "0.03em",
  },
  emergencyBtnAlt: {
    background: "transparent",
    color: "#FF80AB",
    border: "1.5px solid #FF80AB66",
    borderRadius: 10,
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
};

