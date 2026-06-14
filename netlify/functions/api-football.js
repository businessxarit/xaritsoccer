// Netlify Function — proxy sécurisé pour API-Football
// La clé API reste côté serveur, jamais exposée au client

exports.handler = async (event) => {
  const API_KEY = process.env.VITE_API_FOOTBALL_KEY;
  
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key manquante" }) };
  }

  const { endpoint, ...params } = event.queryStringParameters || {};
  
  if (!endpoint) {
    return { statusCode: 400, body: JSON.stringify({ error: "endpoint requis" }) };
  }

  // Endpoints autorisés uniquement
  const ALLOWED = ["fixtures", "standings", "players", "teams", "leagues", "events", "lineups", "statistics"];
  if (!ALLOWED.includes(endpoint)) {
    return { statusCode: 403, body: JSON.stringify({ error: "endpoint non autorisé" }) };
  }

  // World Cup 2026 league ID = 1 (FIFA World Cup)
  const WC_LEAGUE = "1";
  const WC_SEASON = "2026";

  const queryParams = new URLSearchParams({
    league: WC_LEAGUE,
    season: WC_SEASON,
    ...params,
  });

  const url = `https://v3.football.api-sports.io/${endpoint}?${queryParams}`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-apisports-key": API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);
    
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=30", // cache 30s
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
