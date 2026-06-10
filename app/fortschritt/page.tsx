"use client";

import { learnPath } from "@/content/modules";
import { useProgress } from "@/lib/progress/useProgress";
import { Card } from "@/components/ui";

export default function FortschrittPage() {
  const { state, ready, reset } = useProgress();

  const readyNodes = learnPath.filter((n) => n.status === "ready");
  const totalStars = readyNodes.reduce(
    (s, n) => s + (state.modules[n.slug]?.stars ?? 0),
    0,
  );
  const maxStars = readyNodes.length * 3;

  return (
    <div className="px-4 pt-6">
      <header className="mb-5">
        <h1 className="text-2xl font-extrabold text-ink">Dein Fortschritt ⭐</h1>
        <p className="text-slate-500">Schau, wie weit du schon bist!</p>
      </header>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <Card className="text-center">
          <p className="text-3xl">🔥</p>
          <p className="mt-1 text-xl font-extrabold text-ink">
            {ready ? state.streak.count : 0}
          </p>
          <p className="text-xs text-slate-500">Tage am Stück</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl">⭐</p>
          <p className="mt-1 text-xl font-extrabold text-ink">
            {ready ? totalStars : 0}
            <span className="text-sm text-slate-400">/{maxStars}</span>
          </p>
          <p className="text-xs text-slate-500">Sterne</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl">📝</p>
          <p className="mt-1 text-xl font-extrabold text-ink">
            {ready && state.examBest !== null ? `${state.examBest}%` : "–"}
          </p>
          <p className="text-xs text-slate-500">Klausur-Bestwert</p>
        </Card>
      </div>

      <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-slate-400">
        Module
      </h2>
      <div className="space-y-2">
        {readyNodes.map((n) => {
          const prog = state.modules[n.slug];
          const stars = prog?.stars ?? 0;
          return (
            <div
              key={n.slug}
              className="flex items-center gap-3 rounded-xl2 border border-slate-200 bg-white p-3"
            >
              <span className="text-2xl">{n.emoji}</span>
              <p className="flex-1 font-bold text-ink">{n.title}</p>
              <span className="text-base">
                {"⭐".repeat(stars)}
                <span className="text-slate-200">{"☆".repeat(3 - stars)}</span>
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          if (confirm("Wirklich allen Fortschritt zurücksetzen?")) reset();
        }}
        className="mt-8 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-400 hover:text-rose-500"
      >
        Fortschritt zurücksetzen
      </button>
    </div>
  );
}
