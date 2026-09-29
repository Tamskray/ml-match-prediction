// ─────────────────────────────────────────────────────────────────────────────
// Domain Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Team {
  id: string;
  name: string;
  shortName: string;
  /** Hex color used for data-driven visual accents */
  color: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  /** ISO-8601 date string */
  date: string;
}

export interface Prediction {
  homeWinProb: number; // 0–100
  drawProb: number; // 0–100
  awayWinProb: number; // 0–100
  keyFactor: string;
}

export type Weather = "Clear" | "Rain" | "Snow";

export type Formation = "4-3-3" | "4-4-2" | "3-5-2" | "4-2-3-1" | "5-3-2";
