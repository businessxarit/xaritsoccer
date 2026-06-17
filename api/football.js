export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const API_KEY = process.env.FOOTBALL_DATA_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "Clé API manquante" });
  }

  const { endpoint } = req.query;
  const BASE = "https://api.football-data.org/v4";

  const ENDPOINTS = {
    // Tous les matchs du Mondial
    "matches":     `${BASE}/competitions/WC/matches`,
    // Matchs en direct aujourd'hui
    "live":        `${BASE}/competitions/WC/matches?status=LIVE`,
    // Matchs du jour
    "today":       `${BASE}/competitions/WC/matches?status=IN_PLAY,PAUSED`,
    // Classement des groupes
    "standings":   `${BASE}/competitions/WC/standings`,
    // Buteurs
    "scorers":     `${BASE}/competitions/WC/scorers`,
    // Équipes
    "teams":       `${BASE}/competitions/WC/teams`,
  };

  const url = ENDPOINTS[endpoint];
  if (!url) {
    return res.status(403).json({ error: `Endpoint inconnu: ${endpoint}` });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API erreur ${response.status}: ${err}`);
    }

    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(data);

  } catch (err) {
    console.error("Proxy error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}