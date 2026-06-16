import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV = [
  { path: "/",           emoji: "🏠", label: "Accueil"  },
  { path: "/matches",    emoji: "⚽", label: "Matchs"   },
  { path: "/groups",     emoji: "📊", label: "Groupes"  },
  { path: "/players",    emoji: "⭐", label: "Joueurs"  },
  { path: "/history",    emoji: "📖", label: "Histoire" },
  { path: "/pronostics", emoji: "🎯", label: "Pronos"   },
];

export default function FloatingNav() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY.current + 10 && y > 120) setHidden(true);
      else if (y < lastY.current - 10) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const compact = scrolled && !hidden;

  return (
    <div style={{
      position: "fixed",
      bottom: hidden ? -100 : compact ? 16 : 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: compact ? "auto" : "100%",
      maxWidth: compact ? 320 : 480,
      zIndex: 100,
      display: "flex",
      justifyContent: "center",
      transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <div style={{
        background: compact ? "rgba(18,24,38,0.92)" : "rgba(6,10,20,0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: compact ? 50 : 0,
        border: compact ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--bg3)",
        boxShadow: compact ? "0 8px 32px rgba(0,0,0,0.55)" : "none",
        display: "flex",
        alignItems: "center",
        padding: compact ? "8px 10px" : "8px 0 max(12px,env(safe-area-inset-bottom))",
        gap: compact ? 4 : 0,
        width: compact ? "auto" : "100%",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {NAV.map((n) => {
          const active = location.pathname === n.path;
          return (
            <button key={n.path} onClick={() => navigate(n.path)} style={{
              background: active && compact ? "rgba(255,255,255,0.12)" : "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: compact ? "row" : "column",
              alignItems: "center",
              justifyContent: "center",
              flex: compact ? "0 0 auto" : 1,
              padding: compact ? (active ? "8px 14px" : "8px 10px") : "2px 0",
              borderRadius: compact ? 40 : 0,
              transition: "all 0.2s ease",
              gap: 2,
            }}>
              <span style={{
                fontSize: compact ? 20 : 18,
                filter: active ? "none" : "grayscale(60%) opacity(50%)",
                lineHeight: 1,
              }}>{n.emoji}</span>
              {!compact && (
                <>
                  <span style={{ fontSize: 8, fontWeight: active ? 800 : 400, color: active ? "var(--gold)" : "var(--text-muted)", letterSpacing: .2 }}>{n.label}</span>
                  {active && <div style={{ width: 14, height: 2, background: "var(--blue)", borderRadius: 1, marginTop: 1 }} />}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
