import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Activity } from "lucide-react";
import MatchesPage from "@/pages/MatchesPage";
import MatchBuilderPage from "@/pages/MatchBuilderPage";

// ─────────────────────────────────────────────────────────────────────────────
// Top Navigation Bar
// ─────────────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1920px] items-center gap-6 px-4 md:px-8">
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-slate-50 font-semibold text-sm tracking-tight"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
            <Activity className="h-4 w-4 text-white" />
          </div>
          PitchMind
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`
            }
          >
            Match Schedule
          </NavLink>
        </nav>

        {/* Right side */}
        {/* TODO: Logout, Cabinet Links */}
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App Shell
// ─────────────────────────────────────────────────────────────────────────────

function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-[1920px]">
        <Routes>
          <Route path="/" element={<MatchesPage />} />
          <Route path="/builder/:matchId" element={<MatchBuilderPage />} />
        </Routes>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
