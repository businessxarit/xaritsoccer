export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const API_KEY = process.env.APIFOOTBALL_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "Clé API manquante" });
  }

  const { endpoint, fixture, date, team1, team2 } = req.query;
  const BASE = "https://v3.football.api-sports.io";

  try {
    let url;

    if (endpoint === "lineups") {
      if (!fixture) return res.status(400).json({ error: "fixture requis" });
      url = `${BASE}/fixtures/lineups?fixture=${fixture}`;

    } else if (endpoint === "events") {
      if (!fixture) return res.status(400).json({ error: "fixture requis" });
      url = `${BASE}/fixtures/events?fixture=${fixture}`;

    } else if (endpoint === "find-fixture") {
      if (!date) return res.status(400).json({ error: "date requise" });
      url = `${BASE}/fixtures?date=${date}`;

    } else {
      return res.status(403).json({ error: `Endpoint inconnu: ${endpoint}` });
    }

    const response = await fetch(url, {
      headers: {
        "x-apisports-key": API_KEY,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API erreur ${response.status}: ${err}`);
    }

    let data = await response.json();

    // Pour find-fixture, on filtre côté serveur pour ne pas surcharger le front
    if (endpoint === "find-fixture" && team1 && team2) {
      const match = data.response.find((f) => {
        const home = f.teams.home.name.toLowerCase();
        const away = f.teams.away.name.toLowerCase();
        return (
          (home.includes(team1.toLowerCase()) || team1.toLowerCase().includes(home)) &&
          (away.includes(team2.toLowerCase()) || team2.toLowerCase().includes(away))
        );
      });
      data = match ? { fixtureId: match.fixture.id } : { error: "Match non trouvé" };
    }

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(data);

  } catch (err) {
    console.error("Proxy error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}