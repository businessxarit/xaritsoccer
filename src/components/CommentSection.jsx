import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import {
  collection, addDoc, query, orderBy,
  limit, onSnapshot, serverTimestamp
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { REACTIONS } from "../data/data";

export default function CommentSection({ matchId }) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, `matches/${matchId}/comments`),
      orderBy("createdAt", "asc"),
      limit(50)
    );
    const unsub = onSnapshot(q, snap => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return unsub;
  }, [matchId]);

  const sendComment = async () => {
    if (!text.trim() || !user || sending) return;
    setSending(true);
    try {
      await addDoc(collection(db, `matches/${matchId}/comments`), {
        text: text.trim(),
        uid: user.uid,
        username: profile?.username || "Fan",
        flag: profile?.flag || "🌍",
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (e) {
      console.error(e);
    }
    setSending(false);
  };

  const sendReaction = async (emoji) => {
    if (!user) return;
    await addDoc(collection(db, `matches/${matchId}/comments`), {
      text: emoji,
      uid: user.uid,
      username: profile?.username || "Fan",
      flag: profile?.flag || "🌍",
      isReaction: true,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div style={{ background: "var(--bg2)", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--bg3)" }}>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--bg3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>💬 Commentaires</span>
        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{comments.length} messages</span>
      </div>

      {/* Reactions bar */}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--bg3)" }}>
        {REACTIONS.map(r => (
          <button key={r} onClick={() => sendReaction(r)} style={{
            background: "var(--bg3)",
            border: "none",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 18,
            cursor: "pointer",
            transition: "transform 0.1s",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(1.3)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >{r}</button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ height: 220, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {comments.length === 0 && (
          <div style={{ color: "var(--text-dim)", fontSize: 13, textAlign: "center", marginTop: 40 }}>
            Sois le premier à commenter ! ✍️
          </div>
        )}
        {comments.map(c => (
          <div key={c.id} style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
          }}>
            {!c.isReaction && (
              <>
                <div style={{
                  width: 28, height: 28,
                  background: "var(--bg3)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, flexShrink: 0,
                }}>{c.flag}</div>
                <div>
                  <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 11 }}>{c.username} </span>
                  <span style={{ color: "var(--text)", fontSize: 13 }}>{c.text}</span>
                </div>
              </>
            )}
            {c.isReaction && (
              <div style={{ fontSize: 22, animation: "fadeIn 0.3s ease" }}>{c.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid var(--bg3)", display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendComment()}
          placeholder="Ton commentaire..."
          maxLength={200}
          style={{
            flex: 1,
            background: "var(--bg3)",
            border: "1px solid var(--bg4)",
            borderRadius: 10,
            padding: "10px 14px",
            color: "var(--text)",
            fontSize: 13,
            outline: "none",
          }}
        />
        <button onClick={sendComment} disabled={!text.trim() || sending} style={{
          background: text.trim() ? "var(--gold)" : "var(--bg3)",
          border: "none",
          borderRadius: 10,
          padding: "10px 16px",
          color: text.trim() ? "#0d1117" : "var(--text-dim)",
          fontWeight: 800,
          fontSize: 18,
          transition: "all 0.2s",
        }}>➤</button>
      </div>
    </div>
  );
}
