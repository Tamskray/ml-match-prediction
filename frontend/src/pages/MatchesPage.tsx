import { useNavigate } from "react-router-dom";
import { CalendarDays, ChevronRight, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MOCK_MATCHES } from "@/data/mocks";
import type { Match } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MatchCard
// ─────────────────────────────────────────────────────────────────────────────

interface MatchCardProps {
  match: Match;
}

function TeamBadge({ name, shortName, color }: { name: string; shortName: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Color swatch acting as team crest placeholder */}
      <div
        className="h-10 w-10 rounded-full border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {shortName}
      </div>
      <span className="text-sm font-semibold text-slate-100">{name}</span>
    </div>
  );
}

function MatchCard({ match }: MatchCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-500 transition-colors duration-200 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
            <Trophy className="mr-1 h-3 w-3" />
            {match.league}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Teams row */}
        <div className="flex items-center justify-between gap-4 py-3">
          <TeamBadge
            name={match.homeTeam.name}
            shortName={match.homeTeam.shortName}
            color={match.homeTeam.color}
          />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-slate-500">VS</span>
          </div>
          <TeamBadge
            name={match.awayTeam.name}
            shortName={match.awayTeam.shortName}
            color={match.awayTeam.color}
          />
        </div>

        {/* Date row */}
        <div className="flex items-center gap-2 mt-3 text-slate-400 text-xs border-t border-slate-700 pt-3">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          <span>{formatDate(match.date)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full cursor-pointer" onClick={() => navigate(`/builder/${match.id}`)}>
          Open Predictor
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MatchesPage
// ─────────────────────────────────────────────────────────────────────────────

export default function MatchesPage() {
  return (
    <div className="px-4 py-8 md:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-50 tracking-tight">Upcoming Fixtures</h1>
        <p className="text-slate-400 text-sm mt-1">
          Select a fixture to open the prediction builder.
        </p>
      </div>

      {/* Match grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_MATCHES.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
