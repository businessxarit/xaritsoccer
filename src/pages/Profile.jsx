import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const FLAGS = ["🌍", "🇸🇳", "🇫🇷", "🇧🇷", "🇦🇷", "🇪🇸", "🇩🇪", "🇵🇹", "🇲🇦", "🇨🇮", "🇹🇳", "🇳🇬", "🇬🇭", "🇨🇲"];
const TEAMS = ["Senegal", "Brazil", "France", "Spain", "Germany", "Argentina", "England", "Portugal", "Morocco"];

export default function Profile() {
  const { profile, updateProfile, loading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile?.username || "");
  const [flag, setFlag] = useState(profile?.flag || "🌍");
  const [team, setTeam] = useState(profile?.team || "Senegal");
  const [saving, setSaving] = useState(false);

  if (loading || !profile) return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "var(--text-muted)" }} className="pulse">Chargement...</span>
    </div>
  );

  const handleSave = async () => {
    if (!username.trim()) return;
    setSaving(true);
    await updateProfile({ username: username.trim(), flag, team });
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="page fade-in" style={{ maxWidth: 480, margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1a1f2e 0%, var(--bg) 100%)",
        padding: "20px 18px 20px",
        textAlign: "center",
        borderBottom: "1px solid var(--bg3)",
      }}>
        <div style={{
          width: 72, height: 72,
          background: "var(--bg3)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 36,
          margin: "0 auto 12px",
          border: "3px solid var(--gold)",
        }}>{editing ? flag : profile.flag}</div>

        {editing ? (
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            maxLength={20}
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--gold)",
              borderRadius: 10,
              padding: "8px 16px",
              color: "var(--text)",
              fontSize: 16,
              fontWeight: 800,
              textAlign: "center",
              outline: "none",
              width: "100%",
              maxWidth: 200,
            }}
          />
        ) : (
          <div style={{ fontWeight: 900, fontSize: 20 }}>{profile.username}</div>
        )}
        <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 4 }}>
          Supporte : {editing ? team : profile.team} {editing ? "" : TEAMS.includes(profile.team) ? "" : ""}
        </div>
      </div>

      <div style={{ padding: "16px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Points", value: profile.points || 0, icon: "⭐" },
            { label: "Pronos", value: profile.pronos || 0, icon: "🎯" },
            { label: "Rang", value: "#—", icon: "🏆" },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--bg2)",
              borderRadius: "var(--radius)",
              padding: "14px 10px",
              textAlign: "center",
              border: "1px solid var(--bg3)",
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 20, color: "var(--gold)" }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Edit mode */}
        {editing && (
          <div className="fade-in">
            {/* Flag picker */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CHOISIR MON DRAPEAU</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {FLAGS.map(f => (
                  <button key={f} onClick={() => setFlag(f)} style={{
                    background: flag === f ? "var(--bg4)" : "var(--bg2)",
                    border: flag === f ? "2px solid var(--gold)" : "2px solid var(--bg3)",
                    borderRadius: 8,
                    padding: "6px 10px",
                    fontSize: 22,
                    cursor: "pointer",
                  }}>{f}</button>
                ))}
              </div>
            </div>

            {/* Team picker */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>MON ÉQUIPE FAVORITE</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TEAMS.map(t => (
                  <button key={t} onClick={() => setTeam(t)} style={{
                    background: team === t ? "var(--gold)" : "var(--bg2)",
                    color: team === t ? "#0d1117" : "var(--text-muted)",
                    border: team === t ? "none" : "1px solid var(--bg3)",
                    borderRadius: 20,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: team === t ? 800 : 400,
                    cursor: "pointer",
                  }}>{t}</button>
                ))}
              </div>
            </div>

            <button onClick={handleSave} disabled={saving || !username.trim()} style={{
              width: "100%",
              background: "var(--gold)",
              border: "none",
              borderRadius: "var(--radius)",
              padding: 14,
              color: "#0d1117",
              fontWeight: 800,
              fontSize: 15,
              marginBottom: 10,
            }}>{saving ? "Sauvegarde..." : "✅ Sauvegarder"}</button>

            <button onClick={() => setEditing(false)} style={{
              width: "100%",
              background: "none",
              border: "1px solid var(--bg3)",
              borderRadius: "var(--radius)",
              padding: 12,
              color: "var(--text-muted)",
              fontWeight: 600,
              fontSize: 14,
            }}>Annuler</button>
          </div>
        )}

        {!editing && (
          <>
            <button onClick={() => { setUsername(profile.username); setFlag(profile.flag); setTeam(profile.team); setEditing(true); }} style={{
              width: "100%",
              background: "var(--bg2)",
              border: "1px solid var(--bg3)",
              borderRadius: "var(--radius)",
              padding: 14,
              color: "var(--text)",
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 10,
            }}>✏️ Modifier mon profil</button>

            {/* Senegal promo */}
            <div style={{
              background: "rgba(201,162,39,0.07)",
              borderRadius: "var(--radius-lg)",
              padding: 16,
              border: "1px solid rgba(201,162,39,0.2)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🦁</div>
              <div style={{ fontWeight: 800, color: "var(--gold)", marginBottom: 6 }}>Allez les Lions !</div>
              <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                Sénégal · Groupe F · World Cup 2026
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
