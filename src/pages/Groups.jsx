import { useState } from "react";
import { GROUPS } from "../data/data";

export default function Groups() {
  const [selected, setSelected] = useState("I");

  return (
    <div className="page fade-in" style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1a1f2e 0%, var(--bg) 100%)",
        padding: "20px 18px 14px",
        borderBottom: "1px solid var(--bg3)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>📊 Groupes</h1>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
          {Object.keys(GROUPS).map(g => (
            <button key={g} onClick={() => setSelected(g)} style={{
              background: selected === g ? "var(--gold)" : "var(--bg2)",
              color: selected === g ? "#0d1117" : "var(--text-muted)",
              border: selected === g ? "none" : "1px solid var(--bg3)",
              borderRadius: 8,
              minWidth: 38,
              height: 38,
              fontWeight: 800,
              fontSize: 15,
              flexShrink: 0,
            }}>{g}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {/* Group badge */}
        <div style={{
          background: "var(--bg2)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: selected === "I" ? "1px solid rgba(201,162,39,0.35)" : "1px solid var(--bg3)",
          marginBottom: 14,
        }}>
          {/* Table header */}
          <div style={{
            background: "var(--bg3)",
            padding: "12px 16px",
            display: "grid",
            gridTemplateColumns: "24px 1fr 36px 36px 50px",
            gap: 4,
            alignItems: "center",
          }}>
            <div />
            <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>ÉQUIPE</div>
            {["J", "GD", "PTS"].map(h => (
              <div key={h} style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, textAlign: "center" }}>{h}</div>
            ))}
          </div>

          {/* Teams */}
          {GROUPS[selected].map((team, i) => {
            const isSenegal = team.name === "Senegal";
            return (
              <div key={team.name} style={{
                padding: "14px 16px",
                display: "grid",
                gridTemplateColumns: "24px 1fr 36px 36px 50px",
                gap: 4,
                alignItems: "center",
                borderTop: "1px solid var(--bg3)",
                background: isSenegal ? "rgba(201,162,39,0.07)" : "transparent",
              }}>
                <span style={{ color: "var(--text-muted)", fontSize: 12, textAlign: "center" }}>{i + 1}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{team.flag}</span>
                  <span style={{
                    fontWeight: isSenegal ? 800 : 500,
                    color: isSenegal ? "var(--gold)" : "var(--text)",
                    fontSize: 14,
                  }}>{team.name}</span>
                  {isSenegal && <span style={{ fontSize: 12 }}>🦁</span>}
                </div>
                <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>0</div>
                <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>+0</div>
                <div style={{ textAlign: "center", fontWeight: 900, fontSize: 16, color: "var(--gold)" }}>0</div>
              </div>
            );
          })}
        </div>

        {/* All groups quick view */}
        <div style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: 11, letterSpacing: 1.5, marginBottom: 10 }}>
          TOUS LES GROUPES
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {Object.entries(GROUPS).map(([g, teams]) => (
            <div key={g} onClick={() => setSelected(g)} style={{
              background: selected === g ? "rgba(201,162,39,0.1)" : "var(--bg2)",
              borderRadius: "var(--radius)",
              padding: 12,
              border: selected === g ? "1px solid rgba(201,162,39,0.4)" : "1px solid var(--bg3)",
              cursor: "pointer",
            }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: "var(--gold)", marginBottom: 8 }}>Groupe {g}</div>
              {teams.map(t => (
                <div key={t.name} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 4,
                }}>
                  <span style={{ fontSize: 14 }}>{t.flag}</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: t.name === "Senegal" ? 800 : 400,
                    color: t.name === "Senegal" ? "var(--gold)" : "var(--text-muted)",
                  }}>{t.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
