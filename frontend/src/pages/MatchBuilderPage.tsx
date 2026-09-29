import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BrainCircuit, CloudRain, CloudSnow, Loader2, Sun, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlayerCard,
  PLAYER_CARD_WIDTH,
  PLAYER_CARD_HEIGHT,
  PLAYER_CARD_RADIUS,
} from "@/components/PlayerCard";
import { MOCK_MATCHES, MOCK_PREDICTIONS } from "@/data/mocks";
import type { Formation, Match, Prediction, Weather } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const FORMATIONS: Formation[] = ["4-3-3", "4-4-2", "3-5-2", "4-2-3-1", "5-3-2"];

const WEATHER_OPTIONS: { value: Weather; label: string; icon: React.ReactNode }[] = [
  { value: "Clear", label: "Clear", icon: <Sun className="h-3.5 w-3.5" /> },
  { value: "Rain", label: "Rain", icon: <CloudRain className="h-3.5 w-3.5" /> },
  { value: "Snow", label: "Snow", icon: <CloudSnow className="h-3.5 w-3.5" /> },
];

// ─────────────────────────────────────────────────────────────────────────────
// Formation data
// [fx, fy]: fx ∈ [0,1] horizontal, fy ∈ [0,1] depth from midfield → own goal
// ─────────────────────────────────────────────────────────────────────────────

type PlayerPos = [number, number];

const FORMATION_POSITIONS: Record<Formation, PlayerPos[]> = {
  "4-3-3": [
    [0.5, 0.95],
    [0.15, 0.72],
    [0.38, 0.72],
    [0.62, 0.72],
    [0.85, 0.72],
    [0.25, 0.47],
    [0.5, 0.47],
    [0.75, 0.47],
    [0.2, 0.2],
    [0.5, 0.15],
    [0.8, 0.2],
  ],
  "4-4-2": [
    [0.5, 0.95],
    [0.15, 0.72],
    [0.38, 0.72],
    [0.62, 0.72],
    [0.85, 0.72],
    [0.15, 0.47],
    [0.38, 0.47],
    [0.62, 0.47],
    [0.85, 0.47],
    [0.35, 0.2],
    [0.65, 0.2],
  ],
  "3-5-2": [
    [0.5, 0.95],
    [0.25, 0.72],
    [0.5, 0.72],
    [0.75, 0.72],
    [0.1, 0.5],
    [0.3, 0.47],
    [0.5, 0.44],
    [0.7, 0.47],
    [0.9, 0.5],
    [0.35, 0.2],
    [0.65, 0.2],
  ],
  "4-2-3-1": [
    [0.5, 0.95],
    [0.15, 0.76],
    [0.38, 0.76],
    [0.62, 0.76],
    [0.85, 0.76],
    [0.35, 0.58],
    [0.65, 0.58],
    [0.18, 0.38],
    [0.5, 0.36],
    [0.82, 0.38],
    [0.5, 0.16],
  ],
  "5-3-2": [
    [0.5, 0.95],
    [0.1, 0.72],
    [0.28, 0.72],
    [0.5, 0.72],
    [0.72, 0.72],
    [0.9, 0.72],
    [0.25, 0.47],
    [0.5, 0.45],
    [0.75, 0.47],
    [0.35, 0.2],
    [0.65, 0.2],
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Pitch SVG constants — viewBox "0 0 340 580"
// ─────────────────────────────────────────────────────────────────────────────

const P = {
  // Bounds
  x1: 20,
  y1: 14,
  x2: 320,
  y2: 566,
  w: 300,
  h: 552,
  // Center
  cx: 170,
  cy: 290,
  // Half-pitch depth (center → goal, minus small padding)
  halfD: 272,
  // Markings (proportional to 105m × 68m pitch)
  penW: 178,
  penH: 87, // penalty area
  sixW: 81,
  sixH: 29, // 6-yard box
  goalW: 33, // goal width
  ccR: 48, // center circle radius
  spotD: 58, // penalty spot distance from goal line
  // Player card
  CW: PLAYER_CARD_WIDTH,
  CH: PLAYER_CARD_HEIGHT,
  CR: PLAYER_CARD_RADIUS,
};

function pitchPlayerX(fx: number) {
  return P.x1 + fx * P.w;
}
function homePlayerY(fy: number) {
  return P.cy + fy * P.halfD;
}
function awayPlayerY(fy: number) {
  return P.cy - fy * P.halfD;
}
function awayPlayerX(fx: number) {
  return P.x1 + (1 - fx) * P.w;
}

// ─────────────────────────────────────────────────────────────────────────────
// PitchFormationView
// ─────────────────────────────────────────────────────────────────────────────

interface PitchFormationViewProps {
  match: Match;
  homeFormation: Formation;
  awayFormation: Formation;
}

function PitchFormationView({ match, homeFormation, awayFormation }: PitchFormationViewProps) {
  const homePlayers = FORMATION_POSITIONS[homeFormation];
  const awayPlayers = FORMATION_POSITIONS[awayFormation];

  const penX = P.cx - P.penW / 2;
  const sixX = P.cx - P.sixW / 2;
  const goalX = P.cx - P.goalW / 2;

  // Pre-compute player coordinates for defs
  const homeCoords = homePlayers.map(([fx, fy]) => ({
    cx: pitchPlayerX(fx),
    cy: homePlayerY(fy),
  }));
  const awayCoords = awayPlayers.map(([fx, fy]) => ({
    cx: awayPlayerX(fx),
    cy: awayPlayerY(fy),
  }));

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Team legend */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full border border-white/30"
            style={{ backgroundColor: match.awayTeam.color }}
          />
          <span className="text-xs font-semibold text-slate-300">
            {match.awayTeam.name}
            <span className="ml-1.5 text-slate-500 font-normal">({awayFormation})</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">
            {match.homeTeam.name}
            <span className="ml-1.5 text-slate-500 font-normal">({homeFormation})</span>
          </span>
          <div
            className="h-3 w-3 rounded-full border border-white/30"
            style={{ backgroundColor: match.homeTeam.color }}
          />
        </div>
      </div>

      {/* Pitch SVG */}
      <svg
        viewBox="0 0 340 580"
        className="w-full rounded-lg"
        style={{ maxHeight: 620 }}
        aria-label="Football pitch formation view"
      >
        {/* ── Define clip paths for every player card ── */}
        <defs>
          {homeCoords.map(({ cx, cy }, i) => (
            <clipPath key={`clip-h-${i}`} id={`clip-h-${i}`}>
              <rect x={cx - P.CW / 2} y={cy - P.CH / 2} width={P.CW} height={P.CH} rx={P.CR} />
            </clipPath>
          ))}
          {awayCoords.map(({ cx, cy }, i) => (
            <clipPath key={`clip-a-${i}`} id={`clip-a-${i}`}>
              <rect x={cx - P.CW / 2} y={cy - P.CH / 2} width={P.CW} height={P.CH} rx={P.CR} />
            </clipPath>
          ))}
        </defs>

        {/* ── Pitch surface ── */}
        <rect x={0} y={0} width={340} height={580} fill="#0f172a" rx={8} />

        {/* Alternating grass stripes */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={P.x1}
            y={P.y1 + i * (P.h / 7)}
            width={P.w}
            height={P.h / 7}
            fill={i % 2 === 0 ? "#14532d" : "#166534"}
          />
        ))}

        {/* Pitch border */}
        <rect
          x={P.x1}
          y={P.y1}
          width={P.w}
          height={P.h}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />

        {/* Center line */}
        <line
          x1={P.x1}
          y1={P.cy}
          x2={P.x2}
          y2={P.cy}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />

        {/* Center circle */}
        <circle
          cx={P.cx}
          cy={P.cy}
          r={P.ccR}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />
        <circle cx={P.cx} cy={P.cy} r={2} fill="rgba(255,255,255,0.6)" />

        {/* ── Top penalty area (away defensive end) ── */}
        <rect
          x={penX}
          y={P.y1}
          width={P.penW}
          height={P.penH}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />
        <rect
          x={sixX}
          y={P.y1}
          width={P.sixW}
          height={P.sixH}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />
        <rect
          x={goalX}
          y={P.y1 - 8}
          width={P.goalW}
          height={8}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.5}
        />
        <circle cx={P.cx} cy={P.y1 + P.spotD} r={2} fill="rgba(255,255,255,0.6)" />
        <path
          d={`M ${P.cx - P.ccR} ${P.y1 + P.penH} A ${P.ccR} ${P.ccR} 0 0 0 ${P.cx + P.ccR} ${P.y1 + P.penH}`}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />

        {/* ── Bottom penalty area (home defensive end) ── */}
        <rect
          x={penX}
          y={P.y2 - P.penH}
          width={P.penW}
          height={P.penH}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />
        <rect
          x={sixX}
          y={P.y2 - P.sixH}
          width={P.sixW}
          height={P.sixH}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />
        <rect
          x={goalX}
          y={P.y2}
          width={P.goalW}
          height={8}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1.5}
        />
        <circle cx={P.cx} cy={P.y2 - P.spotD} r={2} fill="rgba(255,255,255,0.6)" />
        <path
          d={`M ${P.cx - P.ccR} ${P.y2 - P.penH} A ${P.ccR} ${P.ccR} 0 0 1 ${P.cx + P.ccR} ${P.y2 - P.penH}`}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.5}
        />

        {/* ── Away players (top half, attacks downward) ── */}
        {awayCoords.map(({ cx, cy }, i) => (
          <PlayerCard
            key={`away-${i}`}
            cx={cx}
            cy={cy}
            color={match.awayTeam.color}
            clipId={`clip-a-${i}`}
          />
        ))}

        {/* ── Home players (bottom half, attacks upward) ── */}
        {homeCoords.map(({ cx, cy }, i) => (
          <PlayerCard
            key={`home-${i}`}
            cx={cx}
            cy={cy}
            color={match.homeTeam.color}
            clipId={`clip-h-${i}`}
          />
        ))}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProbabilityBar
// ─────────────────────────────────────────────────────────────────────────────

function ProbabilityBar({
  label,
  value,
  color,
  isWinner,
}: {
  label: string;
  value: number;
  color: string;
  isWinner: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="text-5xl font-black tabular-nums leading-none"
        style={{ color: isWinner ? color : undefined }}
      >
        {value}
        <span className="text-2xl font-semibold text-slate-400">%</span>
      </span>
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: isWinner ? color : undefined }}
      >
        {label}
      </span>
      <div className="w-full h-1 rounded-full bg-slate-700 overflow-hidden mt-1">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: isWinner ? color : "#475569" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PredictionResults
// ─────────────────────────────────────────────────────────────────────────────

function PredictionResults({ match, prediction }: { match: Match; prediction: Prediction }) {
  const maxProb = Math.max(prediction.homeWinProb, prediction.drawProb, prediction.awayWinProb);
  const homeWins = prediction.homeWinProb === maxProb;
  const drawWins = prediction.drawProb === maxProb && !homeWins;
  const awayWins = !homeWins && !drawWins;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 py-4">
        <ProbabilityBar
          label={match.homeTeam.shortName}
          value={prediction.homeWinProb}
          color={match.homeTeam.color}
          isWinner={homeWins}
        />
        <ProbabilityBar
          label="Draw"
          value={prediction.drawProb}
          color="#94a3b8"
          isWinner={drawWins}
        />
        <ProbabilityBar
          label={match.awayTeam.shortName}
          value={prediction.awayWinProb}
          color={match.awayTeam.color}
          isWinner={awayWins}
        />
      </div>
      <div className="border-t border-slate-700" />
      <div className="rounded-lg bg-slate-700/50 border border-slate-600 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-violet-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
            AI Insight
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{prediction.keyFactor}</p>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <p className="text-xs text-slate-500">
          Model confidence is based on xG deltas, form index, and contextual features. Results are
          probabilistic, not deterministic.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MatchBuilderPage
// ─────────────────────────────────────────────────────────────────────────────

export default function MatchBuilderPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();

  const match: Match | undefined = MOCK_MATCHES.find((m) => m.id === matchId);

  const [weather, setWeather] = useState<Weather>("Clear");
  const [homeFormation, setHomeFormation] = useState<Formation>("4-3-3");
  const [awayFormation, setAwayFormation] = useState<Formation>("4-3-3");
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  // Track the previous matchId so we can reset derived state during render
  // instead of inside an effect — this avoids cascading renders.
  const [prevMatchId, setPrevMatchId] = useState(matchId);
  if (prevMatchId !== matchId) {
    setPrevMatchId(matchId);
    setPrediction(null);
  }

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-slate-400">Match not found.</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Fixtures
        </Button>
      </div>
    );
  }

  function handleGenerate() {
    setIsLoading(true);
    setPrediction(null);
    setTimeout(() => {
      const result = matchId ? MOCK_PREDICTIONS[matchId] : null;
      setPrediction(result ?? null);
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="px-4 py-8 md:px-8">
      {/* Back navigation */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        All Fixtures
      </button>

      {/* Match header */}
      <div className="mb-8">
        <Badge variant="outline" className="mb-2 border-slate-600 text-slate-400 text-xs">
          {match.league}
        </Badge>
        <h1 className="text-2xl font-bold text-slate-50 tracking-tight flex items-center gap-3">
          <span style={{ color: match.homeTeam.color }}>{match.homeTeam.name}</span>
          <span className="text-slate-600 font-light">vs</span>
          <span style={{ color: match.awayTeam.color }}>{match.awayTeam.name}</span>
        </h1>
      </div>

      {/* ── Row 1: Settings + Pitch ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inputs (4/12) */}
        <div className="lg:col-span-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Match Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Weather */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">Weather Condition</label>
                <Select value={weather} onValueChange={(v) => setWeather(v as Weather)}>
                  <SelectTrigger className="w-full bg-slate-900 border-slate-600 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    {WEATHER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="flex items-center gap-2">
                          {opt.icon}
                          {opt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Home Formation */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">
                  <span style={{ color: match.homeTeam.color }}>{match.homeTeam.name}</span>{" "}
                  Formation
                </label>
                <Select
                  value={homeFormation}
                  onValueChange={(v) => setHomeFormation(v as Formation)}
                >
                  <SelectTrigger className="w-full bg-slate-900 border-slate-600 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    {FORMATIONS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Away Formation */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">
                  <span style={{ color: match.awayTeam.color }}>{match.awayTeam.name}</span>{" "}
                  Formation
                </label>
                <Select
                  value={awayFormation}
                  onValueChange={(v) => setAwayFormation(v as Formation)}
                >
                  <SelectTrigger className="w-full bg-slate-900 border-slate-600 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    {FORMATIONS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Generate button */}
              <Button
                className="w-full mt-2 cursor-pointer h-10"
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Generate Prediction
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right: Pitch Formation View (8/12) */}
        <div className="lg:col-span-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Tactical Formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PitchFormationView
                match={match}
                homeFormation={homeFormation}
                awayFormation={awayFormation}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Row 2: Prediction Output (full width) ── */}
      {(isLoading || prediction) && (
        <div className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Prediction Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                  <p className="text-sm text-slate-500">Running inference model…</p>
                </div>
              )}
              {!isLoading && prediction && (
                <PredictionResults match={match} prediction={prediction} />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
