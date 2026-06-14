import { useState } from "react";
import MatchCard from "../components/MatchCard";
import CommentSection from "../components/CommentSection";
import { MATCHES } from "../data/data";

const FILTERS = ["Tous", "Sénégal", "Groupe F", "Groupe A"];

export default function Matches() {
  const [filter, setFilter] = useState("Tous");
  const [openMatch, setOpenMatch] = useState(null);

  const filtered = MATCHES.filter(m => {
    if (filter === "Sénégal") return m.home === "Senegal" || m.away === "Senegal";
    if (filter === "Groupe F") return m.group === "F";
    if (filter === "Groupe A") return m.group === "A";
    return true;
  });

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
        <h1 style={{ fontSize: 20, fontWeight: 900, marginBottom: 14 }}>⚽ Matchs</h1>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "var(--gold)" : "var(--bg2)",
              color: filter === f ? "#0d1117" : "var(--text-muted)",
              border: filter === f ? "none" : "1px solid var(--bg3)",
              borderRadius: 20,
              padding: "6px 14px",
              fontWeight: filter === f ? 800 : 500,
              fontSize: 12,
              whiteSpace: "nowrap",
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "var(--text-muted)", padding: 40 }}>Aucun match trouvé</div>
        )}

        {filtered.map(m => (
          <div key={m.id}>
            <MatchCard
              match={m}
              onClick={() => setOpenMatch(openMatch?.id === m.id ? null : m)}
            />

            {/* Inline comment section */}
            {openMatch?.id === m.id && (
              <div style={{ marginTop: -4, marginBottom: 14 }} className="fade-in">
                <CommentSection matchId={m.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
