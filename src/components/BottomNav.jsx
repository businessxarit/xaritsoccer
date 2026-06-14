import { useLocation, useNavigate } from "react-router-dom";

const TABS = [
  { path: "/", icon: "🏠", label: "Accueil" },
  { path: "/matches", icon: "⚽", label: "Matchs" },
  { path: "/pronostics", icon: "🎯", label: "Pronos" },
  { path: "/groups", icon: "📊", label: "Groupes" },
  { path: "/profile", icon: "👤", label: "Profil" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 480,
      background: "rgba(13,17,23,0.95)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid var(--bg3)",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0 max(14px, env(safe-area-inset-bottom))",
      zIndex: 100,
    }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "0 12px",
              opacity: active ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}
          >
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10,
              fontWeight: active ? 700 : 400,
              color: active ? "var(--gold)" : "var(--text-muted)",
            }}>{tab.label}</span>
            {active && (
              <div style={{
                position: "absolute",
                bottom: 0,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--gold)",
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
