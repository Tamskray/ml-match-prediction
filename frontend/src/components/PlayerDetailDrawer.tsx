import { X, Trophy, Activity, Ruler, Scale, Shirt } from "lucide-react";
import type { Player, Team } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface PlayerDetailDrawerProps {
  player: Player | null;
  team: Team | null;
  onClose: () => void;
}

export function PlayerDetailDrawer({ player, team, onClose }: PlayerDetailDrawerProps) {
  if (!player || !team) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-3.5 w-3.5 rounded-full border border-white/20"
              style={{ backgroundColor: team.color }}
            />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {team.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Player Profile Header Card */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-b from-slate-800/60 to-slate-900 flex flex-col items-center text-center">
          {/* Avatar frame */}
          <div className="relative mb-4">
            <div
              className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-950 border-2 shadow-lg flex items-center justify-center"
              style={{ borderColor: team.color }}
            >
              {player.avatarUrl ? (
                <img
                  src={player.avatarUrl}
                  alt={player.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <Shirt className="h-10 w-10 stroke-[1.5] text-slate-400" />
                </div>
              )}
            </div>
            {/* Jersey number badge */}
            <div
              className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-md text-xs font-black text-white shadow-md border border-slate-800"
              style={{ backgroundColor: team.color }}
            >
              #{player.number}
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-50">{player.fullName}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">
              {player.position}
            </Badge>
            <span className="text-xs text-slate-400">{team.name}</span>
          </div>
        </div>

        {/* Player Season Stats */}
        <div className="p-6 space-y-6 flex-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              2025/26 Season Performance
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex flex-col items-center">
                <span className="text-3xl font-black text-slate-100 tabular-nums">
                  {player.goals}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                  Goals
                </span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex flex-col items-center">
                <span className="text-3xl font-black text-slate-100 tabular-nums">
                  {player.assists}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                  Assists
                </span>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-sky-400" />
              Physical Attributes
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 text-slate-400">
                  <Ruler className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Height</span>
                  <span className="text-sm font-bold text-slate-200">{player.height}</span>
                </div>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 text-slate-400">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400 block">Weight</span>
                  <span className="text-sm font-bold text-slate-200">{player.weight}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            Close Panel
          </Button>
        </div>
      </div>
    </div>
  );
}
