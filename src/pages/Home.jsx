import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TOURNAMENT, MATCHES, PREDICTIONS } from "../data/data";

function Countdown({ target }) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const tick = () => setDiff(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  return (
    <div style={{
      background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
      borderRadius: "var(--radius-lg)",
      padding: "16px 18px",
      marginBottom: 16,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div style={{ color: "#0d1117", fontWeight: 800, fontSize: 11, letterSpacing: 1.2 }}>
        🏆 COUP D'ENVOI DANS
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {[{ v: days, l: "J" }, { v: hours, l: "H" }, { v: mins, l: "M" }, { v: secs, l: "S" }].map(({ v, l }) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ color: "#0d1117", fontWeight: 900, fontSize: 22, lineHeight: 1, minWidth: 28 }}>
              {String(v).padStart(2, "0")}
            </div>
            <div style={{ color: "rgba(0,0,0,0.5)", fontSize: 9, fontWeight: 700 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const nextMatch = MATCHES[0];
  const senegalMatches = MATCHES.filter(m => m.home === "Senegal" || m.away === "Senegal");

  return (
    <div className="page fade-in" style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1a1f2e 0%, var(--bg) 100%)",
        padding: "20px 18px 0",
        borderBottom: "1px solid var(--bg3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🏆</span>
            <div>
              <div style={{ color: "var(--gold)", fontWeight: 800, fontSize: 12, letterSpacing: 2 }}>FIFA WORLD CUP 2026</div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{TOURNAMENT.dates} · {TOURNAMENT.hosts}</div>
            </div>
          </div>
          {profile && (
            <button onClick={() => navigate("/profile")} style={{
              background: "var(--bg3)",
              border: "1px solid var(--bg4)",
              borderRadius: "50%",
              width: 38, height: 38,
              fontSize: 18,
              cursor: "pointer",
            }}>{profile.flag}</button>
          )}
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* Countdown */}
        <Countdown target={TOURNAMENT.openingDate.getTime()} />

        {/* Next match */}
        <div style={{
          background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
          borderRadius: "var(--radius-lg)",
          padding: 18,
          marginBottom: 14,
          cursor: "pointer",
        }} onClick={() => navigate("/matches")}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "#0d1117", fontWeight: 800, fontSize: 11, letterSpacing: 1.5 }}>PROCHAIN MATCH</span>
            <span style={{ color: "rgba(0,0,0,0.5)", fontWeight: 700, fontSize: 11 }}>GROUPE {nextMatch.group}</span>
          </div>
          <div style={{ color: "#0d1117", fontWeight: 900, fontSize: 20 }}>{nextMatch.homeflag} {nextMatch.home}</div>
          <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 12, margin: "4px 0" }}>vs</div>
          <div style={{ color: "#0d1117", fontWeight: 900, fontSize: 20 }}>{nextMatch.awayflag} {nextMatch.away}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <span style={{ color: "rgba(0,0,0,0.5)", fontSize: 12 }}>⏱ {nextMatch.date} · {nextMatch.time}</span>
            <span style={{ color: "rgba(0,0,0,0.5)", fontSize: 12 }}>📍 {nextMatch.stadium}</span>
          </div>
        </div>

        {/* Senegal section */}
        <div style={{
          background: "var(--bg2)",
          borderRadius: "var(--radius-lg)",
          padding: 16,
          marginBottom: 14,
          border: "1px solid rgba(201,162,39,0.3)",
        }}>
          <div style={{ color: "var(--gold)", fontWeight: 800, fontSize: 11, letterSpacing: 1.5, marginBottom: 12 }}>
            🦁 LES LIONS DU SÉNÉGAL
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 22 }}>🇸🇳 Sénégal</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 4 }}>Groupe I · Qualifié ✅</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--gold)", fontWeight: 900, fontSize: 20 }}>+2800</div>
              <div style={{ color: "var(--text-muted)", fontSize: 10 }}>cotes titre</div>
            </div>
          </div>

          <div style={{ fontWeight: 700, fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>PROCHAINS MATCHS</div>
          {senegalMatches.slice(0, 2).map(m => (
            <div key={m.id} onClick={() => navigate("/matches")} style={{
              background: "var(--bg3)",
              borderRadius: 10,
              padding: "10px 12px",
              marginBottom: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {m.home === "Senegal"
                  ? `🇸🇳 vs ${m.awayflag} ${m.away}`
                  : `${m.homeflag} ${m.home} vs 🇸🇳`}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{m.date}</span>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Équipes", value: TOURNAMENT.teams, icon: "🏳️" },
            { label: "Matchs", value: TOURNAMENT.matches, icon: "⚽" },
            { label: "Stades", value: TOURNAMENT.stadiums, icon: "🏟️" },
            { label: "Pays hôtes", value: 3, icon: "🌎" },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--bg2)",
              borderRadius: "var(--radius)",
              padding: 14,
              border: "1px solid var(--bg3)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 24, color: "var(--gold)" }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Favorites */}
        <div style={{ background: "var(--bg2)", borderRadius: "var(--radius-lg)", padding: 16, border: "1px solid var(--bg3)" }}>
          <div style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: 11, letterSpacing: 1.5, marginBottom: 12 }}>
            FAVORIS AU TITRE
          </div>
          {PREDICTIONS.slice(0, 4).map((p, i) => (
            <div key={p.team} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ color: "var(--text-muted)", fontSize: 12, width: 18 }}>#{i + 1}</span>
              <span style={{ fontSize: 20 }}>{p.flag}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>{p.team}</span>
              <div style={{ width: 80, height: 5, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${p.chance}%`, height: "100%", background: p.team === "Senegal" ? "var(--gold)" : "var(--blue)", borderRadius: 3 }} />
              </div>
              <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 12, width: 35 }}>{p.chance}%</span>
            </div>
          ))}
          <button onClick={() => navigate("/pronostics")} style={{
            width: "100%",
            marginTop: 8,
            background: "var(--bg3)",
            border: "1px solid var(--bg4)",
            borderRadius: 10,
            padding: "10px",
            color: "var(--gold)",
            fontWeight: 700,
            fontSize: 13,
          }}>Voir toutes les prédictions →</button>
        </div>
      </div>
    </div>
  );
}
