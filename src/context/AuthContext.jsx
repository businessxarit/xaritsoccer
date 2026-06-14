import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          const newProfile = {
            uid: firebaseUser.uid,
            username: "Fan #" + Math.floor(Math.random() * 9000 + 1000),
            flag: "🌍",
            team: "Senegal",
            points: 0,
            pronos: 0,
            createdAt: new Date().toISOString(),
          };
          await setDoc(ref, newProfile);
          setProfile(newProfile);
        }
      } else {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.error("Auth error:", e);
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateProfile = async (data) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const updated = { ...profile, ...data };
    await setDoc(ref, updated, { merge: true });
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
