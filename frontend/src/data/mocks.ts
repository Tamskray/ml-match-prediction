import type { Match, Prediction } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Mock Matches
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_MATCHES: Match[] = [
  {
    id: "arsenal-vs-chelsea",
    homeTeam: {
      id: "arsenal",
      name: "Arsenal",
      shortName: "ARS",
      color: "#EF0107",
    },
    awayTeam: {
      id: "chelsea",
      name: "Chelsea",
      shortName: "CHE",
      color: "#034694",
    },
    league: "Premier League",
    date: "2026-10-05T16:30:00Z",
  },
  {
    id: "real-madrid-vs-barcelona",
    homeTeam: {
      id: "real-madrid",
      name: "Real Madrid",
      shortName: "RMA",
      color: "#FEBE10",
    },
    awayTeam: {
      id: "barcelona",
      name: "Barcelona",
      shortName: "BAR",
      color: "#A50044",
    },
    league: "La Liga",
    date: "2026-10-12T20:00:00Z",
  },
  {
    id: "psg-vs-man-city",
    homeTeam: {
      id: "psg",
      name: "Paris SG",
      shortName: "PSG",
      color: "#004170",
    },
    awayTeam: {
      id: "man-city",
      name: "Man City",
      shortName: "MCI",
      color: "#6CABDD",
    },
    league: "UEFA Champions League",
    date: "2026-10-22T21:00:00Z",
  },
  {
    id: "inter-vs-juventus",
    homeTeam: {
      id: "inter",
      name: "Inter Milan",
      shortName: "INT",
      color: "#0038A8",
    },
    awayTeam: {
      id: "juventus",
      name: "Juventus",
      shortName: "JUV",
      color: "#D4AF37",
    },
    league: "Serie A",
    date: "2026-10-26T19:45:00Z",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Mock Predictions (keyed by match id)
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_PREDICTIONS: Record<string, Prediction> = {
  "arsenal-vs-chelsea": {
    homeWinProb: 52,
    drawProb: 23,
    awayWinProb: 25,
    keyFactor:
      "Arsenal's high press limits Chelsea's build-up from the back. With Saka fit and in form, their wide dominance vs Chelsea's high defensive line is the decisive edge.",
  },
  "real-madrid-vs-barcelona": {
    homeWinProb: 38,
    drawProb: 22,
    awayWinProb: 40,
    keyFactor:
      "Barcelona's positional dominance (xG avg 2.4 last 5) edges Real Madrid at the Bernabeu. Key: Pedri's ability to dictate tempo against Valverde in the midfield battle.",
  },
  "psg-vs-man-city": {
    homeWinProb: 44,
    drawProb: 27,
    awayWinProb: 29,
    keyFactor:
      "PSG hold a structural advantage in wide areas. City's defensive shape without a true holding mid leaves them vulnerable to PSG's transitional speed.",
  },
  "inter-vs-juventus": {
    homeWinProb: 48,
    drawProb: 30,
    awayWinProb: 22,
    keyFactor:
      "Inter's 3-5-2 counters Juventus's pressing triggers. Lautaro's movement behind the defensive line creates consistent xG opportunities from set-pieces.",
  },
};
