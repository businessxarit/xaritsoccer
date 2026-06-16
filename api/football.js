// Vercel Serverless Function — proxy sécurisé API-Football
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  
  const API_KEY = process.env.VITE_API_FOOTBALL_KEY;
  if (!API_KEY) return res.status(500).json({ error: "API key manquante" });

  const { endpoint, ...params } = req.query;
  if (!endpoint) return res.status(400).json({ error: "endpoint requis" });

  const ALLOWED = ["fixtures", "standings", "players", "lineups", "events", "statistics"];
  if (!ALLOWED.includes(endpoint)) return res.status(403).json({ error: "endpoint non autorisé" });

  const WC_LEAGUE = "1";
  const WC_SEASON = "2026";

  const queryParams = new URLSearchParams({ league: WC_LEAGUE, season: WC_SEASON, ...params });
  const url = `https://v3.football.api-sports.io/${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-apisports-key": API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    
    // Cache 30s sur Vercel Edge
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
