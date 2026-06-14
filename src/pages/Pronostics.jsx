import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc, setDoc, getDoc, collection,
  query, where, getDocs
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Leaderboard from "../components/Leaderboard";
import { MATCHES } from "../data/data";

const RESULT_OPTIONS = [
  { value: "home", label: "Victoire équipe 1" },
  { value: "draw", label: "Match nul" },
  { value: "away", label: "Victoire équipe 2" },
];

function PronoCard({ match, existingProno, onSave }) {
  const [result, setResult] = useState(existingProno?.result || null);
  const [homeScore, setHomeScore] = useState(existingProno?.homeScore ?? "");
  const [awayScore, setAwayScore] = useState(existingProno?.awayScore ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!existingProno);

  const handleSave = async () => {
    if (!result || homeScore === "" || awayScore === "") return;
    setSaving(true);
    await onSave(match.id, { result, homeScore: Number(homeScore), awayScore: Number(awayScore) });
    setSaving(false);
    setSaved(true);
  };

  return (
    <div style={{
      background: "var(--bg2)",
      borderRadius: "var(--radius-lg)",
      padding: 16,
      marginBottom: 12,
      border: (match.home === "Senegal" || match.away === "Senegal")
        ? "1px solid rgba(201,162,39,0.35)"
        : "1px solid var(--bg3)",
    }}>
      {/* Match header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 10, letterSpacing: 1 }}>GROUPE {match.group} · {match.date}</span>
        {saved && <span style={{ color: "var(--green)", fontSize: 11 }}>✅ Enregistré</span>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div style={{ fontSize: 26 }}>{match.homeflag}</div>
          <div style={{ fontWeight: 700, fontSize: 12, marginTop: 4 }}>{match.home}</div>
        </div>
        <div style={{ color: "var(--text-muted)", fontWeight: 900, fontSize: 14 }}>VS</div>
        <div style={{ textAlign: "center", flex: 1 }}>
          <div style={{ fontSize: 26 }}>{match.awayflag}</div>
          <div style={{ fontWeight: 700, fontSize: 12, marginTop: 4 }}>{match.away}</div>
        </div>
      </div>

      {/* Score input */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
        <input
          type="number" min="0" max="20"
          value={homeScore}
          onChange={e => { setHomeScore(e.target.value); setSaved(false); }}
          placeholder="0"
          style={{
            width: 52, height: 48,
            background: "var(--bg3)",
            border: "1px solid var(--bg4)",
            borderRadius: 10,
            color: "var(--text)",
            fontSize: 22,
            fontWeight: 900,
            textAlign: "center",
            outline: "none",
          }}
        />
        <span style={{ color: "var(--text-muted)", fontWeight: 900, fontSize: 18 }}>—</span>
        <input
          type="number" min="0" max="20"
          value={awayScore}
          onChange={e => { setAwayScore(e.target.value); setSaved(false); }}
          placeholder="0"
          style={{
            width: 52, height: 48,
            background: "var(--bg3)",
            border: "1px solid var(--bg4)",
            borderRadius: 10,
            color: "var(--text)",
            fontSize: 22,
            fontWeight: 900,
            textAlign: "center",
            outline: "none",
          }}
        />
      </div>

      {/* Result selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {RESULT_OPTIONS.map(opt => (
          <button key={opt.value} onClick={() => { setResult(opt.value); setSaved(false); }} style={{
            flex: 1,
            background: result === opt.value ? "var(--gold)" : "var(--bg3)",
            color: result === opt.value ? "#0d1117" : "var(--text-muted)",
            border: "none",
            borderRadius: 8,
            padding: "8px 4px",
            fontSize: 10,
            fontWeight: result === opt.value ? 800 : 500,
            cursor: "pointer",
            transition: "all 0.15s",
          }}>{opt.label}</button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!result || homeScore === "" || awayScore === "" || saving}
        style={{
          width: "100%",
          background: result && homeScore !== "" && awayScore !== "" ? "var(--gold)" : "var(--bg3)",
          color: result && homeScore !== "" && awayScore !== "" ? "#0d1117" : "var(--text-dim)",
          border: "none",
          borderRadius: 10,
          padding: 12,
          fontWeight: 800,
          fontSize: 13,
          transition: "all 0.2s",
        }}>
        {saving ? "Enregistrement..." : saved ? "Modifier le pronostic" : "🎯 Valider mon pronostic"}
      </button>
    </div>
  );
}

export default function Pronostics() {
  const { user, profile, updateProfile } = useAuth();
  const [pronos, setPronos] = useState({});
  const [tab, setTab] = useState("pronos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchPronos = async () => {
      const q = query(collection(db, "pronostics"), where("uid", "==", user.uid));
      const snap = await getDocs(q);
      const map = {};
      snap.forEach(d => { map[d.data().matchId] = d.data(); });
      setPronos(map);
      setLoading(false);
    };
    fetchPronos();
  }, [user]);

  const saveProno = async (matchId, data) => {
    if (!user) return;
    const id = `${user.uid}_${matchId}`;
    await setDoc(doc(db, "pronostics", id), {
      uid: user.uid,
      matchId,
      ...data,
      savedAt: new Date().toISOString(),
    });
    setPronos(prev => ({ ...prev, [matchId]: data }));
    const newCount = Object.keys(pronos).length + (pronos[matchId] ? 0 : 1);
    await updateProfile({ pronos: newCount });
  };

  return (
    <div className="page fade-in" style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1a1f2e 0%, var(--bg) 100%)",
        padding: "20px 18px 0",
        borderBottom: "1px solid var(--bg3)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h1 style={{ fontSize: 20, fontWeight: 900 }}>🎯 Pronostics</h1>
          <div style={{
            background: "rgba(201,162,39,0.1)",
            borderRadius: 8,
            padding: "6px 12px",
            color: "var(--gold)",
            fontWeight: 700,
            fontSize: 12,
          }}>
            {profile?.points || 0} pts
          </div>
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {[{ k: "pronos", l: "Mes pronos" }, { k: "leaderboard", l: "🏆 Classement" }].map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              flex: 1,
              background: "none",
              border: "none",
              color: tab === t.k ? "var(--gold)" : "var(--text-muted)",
              fontWeight: tab === t.k ? 700 : 400,
              fontSize: 13,
              padding: "10px 0",
              borderBottom: tab === t.k ? "2px solid var(--gold)" : "2px solid transparent",
              cursor: "pointer",
            }}>{t.l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {tab === "pronos" && (
          <>
            {/* Points system info */}
            <div style={{
              background: "rgba(201,162,39,0.08)",
              borderRadius: "var(--radius)",
              padding: 12,
              marginBottom: 14,
              border: "1px solid rgba(201,162,39,0.2)",
            }}>
              <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Système de points</div>
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-muted)" }}>
                <span>✅ Score exact = <strong style={{ color: "var(--gold)" }}>3 pts</strong></span>
                <span>🎯 Bonne issue = <strong style={{ color: "var(--text)" }}>1 pt</strong></span>
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Chargement...</div>
            ) : (
              MATCHES.map(m => (
                <PronoCard
                  key={m.id}
                  match={m}
                  existingProno={pronos[m.id]}
                  onSave={saveProno}
                />
              ))
            )}
          </>
        )}

        {tab === "leaderboard" && <Leaderboard />}
      </div>
    </div>
  );
}
