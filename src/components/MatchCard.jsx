export default function MatchCard({ match, highlight = false, onClick }) {
  const isSenegal = match.home === "Senegal" || match.away === "Senegal";

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg2)",
        borderRadius: "var(--radius-lg)",
        padding: "16px",
        marginBottom: 10,
        border: isSenegal
          ? "1px solid rgba(201,162,39,0.4)"
          : "1px solid var(--bg3)",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.15s, border-color 0.15s",
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.transform = "scale(1.01)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {/* Top row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 12,
        alignItems: "center",
      }}>
        <span style={{
          color: "var(--gold)",
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: 1.5,
          background: "rgba(201,162,39,0.1)",
          padding: "3px 8px",
          borderRadius: 4,
        }}>GROUPE {match.group}</span>
        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
          {match.date} · {match.time}
        </span>
      </div>

      {/* Teams */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 24 }}>{match.homeflag}</span>
          <div style={{
            fontWeight: match.home === "Senegal" ? 800 : 600,
            fontSize: 14,
            marginTop: 4,
            color: match.home === "Senegal" ? "var(--gold)" : "var(--text)",
          }}>{match.home}</div>
        </div>

        <div style={{
          background: "var(--bg3)",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 900,
          fontSize: 13,
          color: "var(--text-muted)",
          letterSpacing: 1,
          margin: "0 10px",
        }}>
          {match.status === "live"
            ? <span style={{ color: "var(--green)" }}>LIVE</span>
            : match.status === "finished"
            ? `${match.homeScore} - ${match.awayScore}`
            : "VS"}
        </div>

        <div style={{ flex: 1, textAlign: "right" }}>
          <span style={{ fontSize: 24 }}>{match.awayflag}</span>
          <div style={{
            fontWeight: match.away === "Senegal" ? 800 : 600,
            fontSize: 14,
            marginTop: 4,
            color: match.away === "Senegal" ? "var(--gold)" : "var(--text)",
          }}>{match.away}</div>
        </div>
      </div>

      {/* Stadium */}
      <div style={{
        marginTop: 12,
        color: "var(--text-muted)",
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}>
        <span>📍</span>
        <span>{match.stadium}, {match.city}</span>
      </div>
    </div>
  );
}
