export const TOURNAMENT = {
  name: "FIFA World Cup 2026",
  dates: "11 Juin – 19 Juillet 2026",
  hosts: "USA · Canada · Mexique",
  openingDate: new Date("2026-06-11T21:00:00+02:00"),
  teams: 48,
  matches: 104,
  stadiums: 16,
};

// Groupes officiels — tirage FIFA du 5 décembre 2025
export const GROUPS = {
  A: [
    { name: "Mexico", flag: "🇲🇽" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "South Korea", flag: "🇰🇷" },
    { name: "Czech Republic", flag: "🇨🇿" },
  ],
  B: [
    { name: "Canada", flag: "🇨🇦" },
    { name: "Bosnia-Herzegovina", flag: "🇧🇦" },
    { name: "Qatar", flag: "🇶🇦" },
    { name: "Switzerland", flag: "🇨🇭" },
  ],
  C: [
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Morocco", flag: "🇲🇦" },
    { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    { name: "Haiti", flag: "🇭🇹" },
  ],
  D: [
    { name: "USA", flag: "🇺🇸" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Paraguay", flag: "🇵🇾" },
    { name: "Turkey", flag: "🇹🇷" },
  ],
  E: [
    { name: "Germany", flag: "🇩🇪" },
    { name: "Ecuador", flag: "🇪🇨" },
    { name: "Ivory Coast", flag: "🇨🇮" },
    { name: "Curaçao", flag: "🇨🇼" },
  ],
  F: [
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Tunisia", flag: "🇹🇳" },
    { name: "Sweden", flag: "🇸🇪" },
  ],
  G: [
    { name: "Belgium", flag: "🇧🇪" },
    { name: "Iran", flag: "🇮🇷" },
    { name: "Egypt", flag: "🇪🇬" },
    { name: "New Zealand", flag: "🇳🇿" },
  ],
  H: [
    { name: "Spain", flag: "🇪🇸" },
    { name: "Uruguay", flag: "🇺🇾" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Cape Verde", flag: "🇨🇻" },
  ],
  I: [
    { name: "France", flag: "🇫🇷" },
    { name: "Senegal", flag: "🇸🇳" },
    { name: "Norway", flag: "🇳🇴" },
    { name: "Iraq", flag: "🇮🇶" },
  ],
  J: [
    { name: "Argentina", flag: "🇦🇷" },
    { name: "Austria", flag: "🇦🇹" },
    { name: "Algeria", flag: "🇩🇿" },
    { name: "Jordan", flag: "🇯🇴" },
  ],
  K: [
    { name: "Portugal", flag: "🇵🇹" },
    { name: "Colombia", flag: "🇨🇴" },
    { name: "Uzbekistan", flag: "🇺🇿" },
    { name: "DR Congo", flag: "🇨🇩" },
  ],
  L: [
    { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Croatia", flag: "🇭🇷" },
    { name: "Panama", flag: "🇵🇦" },
    { name: "Ghana", flag: "🇬🇭" },
  ],
};

// Calendrier complet journée 1 + 2 (heure de Paris)
export const MATCHES = [
  // JOURNÉE 1
  { id: "m_a1", home: "Mexico", homeflag: "🇲🇽", away: "South Africa", awayflag: "🇿🇦", date: "2026-06-11", time: "21:00", stadium: "Estadio Azteca", city: "Mexico City", group: "A", status: "upcoming" },
  { id: "m_b1", home: "South Korea", homeflag: "🇰🇷", away: "Czech Republic", awayflag: "🇨🇿", date: "2026-06-12", time: "04:00", stadium: "SoFi Stadium", city: "Los Angeles", group: "A", status: "upcoming" },
  { id: "m_b2", home: "Canada", homeflag: "🇨🇦", away: "Bosnia-Herzegovina", awayflag: "🇧🇦", date: "2026-06-12", time: "21:00", stadium: "BC Place", city: "Vancouver", group: "B", status: "upcoming" },
  { id: "m_d1", home: "USA", homeflag: "🇺🇸", away: "Paraguay", awayflag: "🇵🇾", date: "2026-06-13", time: "03:00", stadium: "MetLife Stadium", city: "New York", group: "D", status: "upcoming" },
  { id: "m_b3", home: "Qatar", homeflag: "🇶🇦", away: "Switzerland", awayflag: "🇨🇭", date: "2026-06-13", time: "21:00", stadium: "Levi's Stadium", city: "San Francisco", group: "B", status: "upcoming" },
  { id: "m_c1", home: "Brazil", homeflag: "🇧🇷", away: "Morocco", awayflag: "🇲🇦", date: "2026-06-14", time: "00:00", stadium: "Rose Bowl", city: "Los Angeles", group: "C", status: "upcoming" },
  { id: "m_c2", home: "Haiti", homeflag: "🇭🇹", away: "Scotland", awayflag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", date: "2026-06-14", time: "03:00", stadium: "AT&T Stadium", city: "Dallas", group: "C", status: "upcoming" },
  { id: "m_d2", home: "Australia", homeflag: "🇦🇺", away: "Turkey", awayflag: "🇹🇷", date: "2026-06-14", time: "06:00", stadium: "Lumen Field", city: "Seattle", group: "D", status: "upcoming" },
  { id: "m_e1", home: "Germany", homeflag: "🇩🇪", away: "Curaçao", awayflag: "🇨🇼", date: "2026-06-14", time: "19:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta", group: "E", status: "upcoming" },
  { id: "m_f1", home: "Netherlands", homeflag: "🇳🇱", away: "Japan", awayflag: "🇯🇵", date: "2026-06-14", time: "22:00", stadium: "Hard Rock Stadium", city: "Miami", group: "F", status: "upcoming" },
  { id: "m_e2", home: "Ivory Coast", homeflag: "🇨🇮", away: "Ecuador", awayflag: "🇪🇨", date: "2026-06-15", time: "01:00", stadium: "Estadio Akron", city: "Guadalajara", group: "E", status: "upcoming" },
  { id: "m_f2", home: "Sweden", homeflag: "🇸🇪", away: "Tunisia", awayflag: "🇹🇳", date: "2026-06-15", time: "04:00", stadium: "Arrowhead Stadium", city: "Kansas City", group: "F", status: "upcoming" },
  { id: "m_h1", home: "Spain", homeflag: "🇪🇸", away: "Cape Verde", awayflag: "🇨🇻", date: "2026-06-15", time: "18:00", stadium: "Gillette Stadium", city: "Boston", group: "H", status: "upcoming" },
  { id: "m_g1", home: "Belgium", homeflag: "🇧🇪", away: "Egypt", awayflag: "🇪🇬", date: "2026-06-15", time: "21:00", stadium: "Lincoln Financial Field", city: "Philadelphia", group: "G", status: "upcoming" },
  { id: "m_h2", home: "Saudi Arabia", homeflag: "🇸🇦", away: "Uruguay", awayflag: "🇺🇾", date: "2026-06-16", time: "00:00", stadium: "NRG Stadium", city: "Houston", group: "H", status: "upcoming" },
  { id: "m_g2", home: "Iran", homeflag: "🇮🇷", away: "New Zealand", awayflag: "🇳🇿", date: "2026-06-16", time: "03:00", stadium: "SoFi Stadium", city: "Los Angeles", group: "G", status: "upcoming" },
  { id: "m_i1", home: "France", homeflag: "🇫🇷", away: "Senegal", awayflag: "🇸🇳", date: "2026-06-16", time: "21:00", stadium: "MetLife Stadium", city: "New York", group: "I", status: "upcoming" },
  // JOURNÉE 2
  { id: "m_i2", home: "Iraq", homeflag: "🇮🇶", away: "Norway", awayflag: "🇳🇴", date: "2026-06-17", time: "00:00", stadium: "Gillette Stadium", city: "Boston", group: "I", status: "upcoming" },
  { id: "m_j1", home: "Argentina", homeflag: "🇦🇷", away: "Algeria", awayflag: "🇩🇿", date: "2026-06-17", time: "03:00", stadium: "MetLife Stadium", city: "New York", group: "J", status: "upcoming" },
  { id: "m_j2", home: "Austria", homeflag: "🇦🇹", away: "Jordan", awayflag: "🇯🇴", date: "2026-06-17", time: "06:00", stadium: "Levi's Stadium", city: "San Francisco", group: "J", status: "upcoming" },
  { id: "m_k1", home: "Portugal", homeflag: "🇵🇹", away: "DR Congo", awayflag: "🇨🇩", date: "2026-06-17", time: "19:00", stadium: "AT&T Stadium", city: "Dallas", group: "K", status: "upcoming" },
  { id: "m_l1", home: "England", homeflag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", away: "Croatia", awayflag: "🇭🇷", date: "2026-06-17", time: "22:00", stadium: "Rose Bowl", city: "Los Angeles", group: "L", status: "upcoming" },
  { id: "m_l2", home: "Ghana", homeflag: "🇬🇭", away: "Panama", awayflag: "🇵🇦", date: "2026-06-18", time: "01:00", stadium: "Hard Rock Stadium", city: "Miami", group: "L", status: "upcoming" },
  { id: "m_k2", home: "Uzbekistan", homeflag: "🇺🇿", away: "Colombia", awayflag: "🇨🇴", date: "2026-06-18", time: "04:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta", group: "K", status: "upcoming" },
  // JOURNÉE 3 (Sénégal)
  { id: "m_i3a", home: "Norway", homeflag: "🇳🇴", away: "Senegal", awayflag: "🇸🇳", date: "2026-06-23", time: "02:00", stadium: "AT&T Stadium", city: "Dallas", group: "I", status: "upcoming" },
  { id: "m_i3b", home: "France", homeflag: "🇫🇷", away: "Iraq", awayflag: "🇮🇶", date: "2026-06-22", time: "23:00", stadium: "Lincoln Financial Field", city: "Philadelphia", group: "I", status: "upcoming" },
  { id: "m_i4a", home: "Senegal", homeflag: "🇸🇳", away: "Iraq", awayflag: "🇮🇶", date: "2026-06-26", time: "21:00", stadium: "SoFi Stadium", city: "Los Angeles", group: "I", status: "upcoming" },
  { id: "m_i4b", home: "Norway", homeflag: "🇳🇴", away: "France", awayflag: "🇫🇷", date: "2026-06-26", time: "21:00", stadium: "Gillette Stadium", city: "Boston", group: "I", status: "upcoming" },
];

export const SENEGAL_MATCHES = MATCHES.filter(m => m.home === "Senegal" || m.away === "Senegal");

export const VENUES = [
  { name: "MetLife Stadium", city: "New York / New Jersey", capacity: "82,500", country: "USA", flag: "🇺🇸" },
  { name: "AT&T Stadium", city: "Dallas", capacity: "80,000", country: "USA", flag: "🇺🇸" },
  { name: "SoFi Stadium", city: "Los Angeles", capacity: "70,240", country: "USA", flag: "🇺🇸" },
  { name: "Levi's Stadium", city: "San Francisco", capacity: "68,500", country: "USA", flag: "🇺🇸" },
  { name: "Rose Bowl", city: "Los Angeles", capacity: "87,519", country: "USA", flag: "🇺🇸" },
  { name: "Hard Rock Stadium", city: "Miami", capacity: "65,326", country: "USA", flag: "🇺🇸" },
  { name: "NRG Stadium", city: "Houston", capacity: "72,220", country: "USA", flag: "🇺🇸" },
  { name: "Mercedes-Benz Stadium", city: "Atlanta", capacity: "71,000", country: "USA", flag: "🇺🇸" },
  { name: "Lumen Field", city: "Seattle", capacity: "69,000", country: "USA", flag: "🇺🇸" },
  { name: "Arrowhead Stadium", city: "Kansas City", capacity: "76,416", country: "USA", flag: "🇺🇸" },
  { name: "Gillette Stadium", city: "Boston", capacity: "65,878", country: "USA", flag: "🇺🇸" },
  { name: "Lincoln Financial Field", city: "Philadelphia", capacity: "69,796", country: "USA", flag: "🇺🇸" },
  { name: "Estadio Azteca", city: "Mexico City", capacity: "87,500", country: "Mexique", flag: "🇲🇽" },
  { name: "Estadio Akron", city: "Guadalajara", capacity: "49,850", country: "Mexique", flag: "🇲🇽" },
  { name: "BC Place", city: "Vancouver", capacity: "54,500", country: "Canada", flag: "🇨🇦" },
  { name: "BMO Field", city: "Toronto", capacity: "45,736", country: "Canada", flag: "🇨🇦" },
];

export const PREDICTIONS = [
  { team: "Brazil", flag: "🇧🇷", odds: "+350", chance: 22, group: "C" },
  { team: "France", flag: "🇫🇷", odds: "+400", chance: 18, group: "I" },
  { team: "Spain", flag: "🇪🇸", odds: "+450", chance: 16, group: "H" },
  { team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", odds: "+500", chance: 14, group: "L" },
  { team: "Germany", flag: "🇩🇪", odds: "+600", chance: 12, group: "E" },
  { team: "Argentina", flag: "🇦🇷", odds: "+650", chance: 10, group: "J" },
  { team: "Portugal", flag: "🇵🇹", odds: "+700", chance: 9, group: "K" },
  { team: "Senegal", flag: "🇸🇳", odds: "+2800", chance: 4, group: "I" },
];

export const TOP_PLAYERS = [
  { name: "Kylian Mbappé", country: "France", flag: "🇫🇷", position: "AT", club: "Real Madrid", number: 10 },
  { name: "Vinicius Jr.", country: "Brazil", flag: "🇧🇷", position: "AT", club: "Real Madrid", number: 7 },
  { name: "Erling Haaland", country: "Norway", flag: "🇳🇴", position: "AT", club: "Man City", number: 9 },
  { name: "Jude Bellingham", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "MF", club: "Real Madrid", number: 5 },
  { name: "Pedri", country: "Spain", flag: "🇪🇸", position: "MF", club: "Barcelona", number: 8 },
  { name: "Sadio Mané", country: "Senegal", flag: "🇸🇳", position: "AT", club: "Al-Nassr", number: 10 },
  { name: "Bukayo Saka", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "AT", club: "Arsenal", number: 7 },
  { name: "Lamine Yamal", country: "Spain", flag: "🇪🇸", position: "AT", club: "Barcelona", number: 19 },
];

export const REACTIONS = ["🔥", "⚽", "🏆", "😤", "👏", "🦁"];
