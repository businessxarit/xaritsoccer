import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const { user } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("points", "desc"), limit(20));
    const unsub = onSnapshot(q, snap => {
      setLeaders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return (
    <div style={{ padding: 20, textAlign: "center", color: "var(--text-muted)" }}>
      <span className="pulse">Chargement...</span>
    </div>
  );

  return (
    <div style={{ background: "var(--bg2)", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--bg3)" }}>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bg3)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>🏆</span>
        <span style={{ fontWeight: 800, fontSize: 15 }}>Classement</span>
        <span style={{ color: "var(--text-muted)", fontSize: 11, marginLeft: "auto" }}>Points pronos</span>
      </div>

      {leaders.length === 0 && (
        <div style={{ padding: 30, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
          Aucun pronostic encore. Sois le premier ! 🎯
        </div>
      )}

      {leaders.map((l, i) => {
        const isMe = l.id === user?.uid;
        return (
          <div key={l.id} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "13px 16px",
            borderTop: i > 0 ? "1px solid var(--bg3)" : "none",
            background: isMe ? "rgba(201,162,39,0.07)" : "transparent",
          }}>
            <span style={{ fontSize: i < 3 ? 20 : 14, width: 24, textAlign: "center", color: i >= 3 ? "var(--text-muted)" : undefined }}>
              {i < 3 ? MEDALS[i] : `${i + 1}`}
            </span>
            <div style={{
              width: 34, height: 34,
              background: "var(--bg3)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
              border: isMe ? "2px solid var(--gold)" : "2px solid transparent",
            }}>{l.flag}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: isMe ? 800 : 600, fontSize: 13, color: isMe ? "var(--gold)" : "var(--text)" }}>
                {l.username} {isMe && <span style={{ fontSize: 10 }}>(toi)</span>}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{l.pronos || 0} pronos</div>
            </div>
            <div style={{ fontWeight: 900, fontSize: 18, color: i === 0 ? "var(--gold)" : "var(--text)" }}>
              {l.points || 0}
              <span style={{ color: "var(--text-muted)", fontSize: 10, fontWeight: 400 }}> pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
