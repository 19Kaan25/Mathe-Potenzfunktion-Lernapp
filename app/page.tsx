"use client";

import Link from "next/link";
import { learnPath } from "@/content/modules";
import { familyTheme } from "@/lib/theme";
import { useProgress } from "@/lib/progress/useProgress";
import { ProgressRing } from "@/components/ui";

export default function HomePage() {
  const { state, ready } = useProgress();

  const readyNodes = learnPath.filter((n) => n.status === "ready");
  const doneCount = readyNodes.filter(
    (n) => state.modules[n.slug]?.completed,
  ).length;
  const ratio = readyNodes.length ? doneCount / readyNodes.length : 0;

  return (
    <div className="px-4 pt-6">
      <header className="mb-5">
        <h1 className="text-2xl font-extrabold text-ink">Hallo Ella! 👋</h1>
        <p className="text-slate-500">
          Schritt für Schritt zur Mathe-Klausur. Du schaffst das! 💪
        </p>
      </header>

      {/* Übersicht */}
      <div className="mb-6 flex items-center gap-4 rounded-xl2 border border-slate-200 bg-white p-4 shadow-sm">
        <ProgressRing value={ratio} color="#0284c7">
          <span className="text-lg font-extrabold text-ink">
            {ready ? `${Math.round(ratio * 100)}%` : "–"}
          </span>
        </ProgressRing>
        <div className="flex-1">
          <p className="font-extrabold text-ink">
            {doneCount} von {readyNodes.length} Modulen geschafft
          </p>
          <div className="mt-1 flex gap-3 text-sm text-slate-500">
            <span>🔥 {ready ? state.streak.count : 0} Tage</span>
            <span>
              📝 Klausur:{" "}
              {ready && state.examBest !== null ? `${state.examBest}%` : "–"}
            </span>
          </div>
        </div>
      </div>

      <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-slate-400">
        Dein Lernpfad
      </h2>

      <ol className="space-y-3">
        {learnPath.map((node, i) => {
          const theme = familyTheme[node.family];
          const prog = state.modules[node.slug];
          const isReady = node.status === "ready";
          const stars = prog?.stars ?? 0;

          const inner = (
            <div
              className={`flex items-center gap-3 rounded-xl2 border p-3 shadow-sm transition ${
                isReady
                  ? `border-slate-200 bg-white active:scale-[0.99]`
                  : "border-dashed border-slate-200 bg-slate-50"
              }`}
            >
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${
                  isReady ? theme.soft : "bg-slate-100 opacity-60"
                }`}
              >
                {node.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`truncate font-extrabold ${
                      isReady ? "text-ink" : "text-slate-400"
                    }`}
                  >
                    {node.title}
                  </p>
                  {prog?.completed && (
                    <span className="text-emerald-500">✓</span>
                  )}
                </div>
                <p className="truncate text-sm text-slate-500">
                  {node.subtitle}
                </p>
                {isReady ? (
                  <div className="mt-0.5 text-sm">
                    {"⭐".repeat(stars)}
                    <span className="text-slate-300">
                      {"☆".repeat(3 - stars)}
                    </span>
                  </div>
                ) : (
                  <span className="mt-0.5 inline-block rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-500">
                    bald verfügbar
                  </span>
                )}
              </div>
              {isReady && <span className="text-slate-300">›</span>}
            </div>
          );

          return (
            <li key={node.slug} className="relative">
              <span className="absolute -left-0.5 top-0 text-xs font-bold text-slate-300">
                {String(i + 1)}
              </span>
              {isReady ? (
                <Link href={`/lernen/${node.slug}`} className="block">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 rounded-xl2 border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        🧭 <b>Tipp:</b> Arbeite den Pfad von oben nach unten ab. Wenn du dich
        sicher fühlst, teste dich in der{" "}
        <Link href="/probeklausur" className="font-bold underline">
          Probeklausur
        </Link>
        .
      </div>
    </div>
  );
}
