"use client";

import { useState } from "react";
import Link from "next/link";
import type { Exercise } from "@/lib/types";
import { modulesBySlug } from "@/content/modules";
import { familyTheme } from "@/lib/theme";
import { useProgress } from "@/lib/progress/useProgress";
import { Button, Card } from "@/components/ui";
import { ExerciseStepper } from "@/components/ExerciseStepper";

const readyModules = Object.values(modulesBySlug);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function UebenPage() {
  const { touchStreak } = useProgress();
  const [pool, setPool] = useState<Exercise[] | null>(null);
  const [title, setTitle] = useState("");
  const [accent, setAccent] = useState("");
  const [finished, setFinished] = useState<{
    correct: number;
    total: number;
  } | null>(null);

  const start = (exercises: Exercise[], label: string, btn: string) => {
    setPool(shuffle(exercises));
    setTitle(label);
    setAccent(btn);
    setFinished(null);
    window.scrollTo({ top: 0 });
  };

  if (pool) {
    return (
      <div className="px-4 pt-4">
        <button
          onClick={() => setPool(null)}
          className="mb-3 text-sm font-bold text-slate-400 hover:text-ink"
        >
          ← Andere Übung wählen
        </button>
        <h1 className="mb-3 text-lg font-extrabold text-ink">{title}</h1>
        {finished ? (
          <Card className="text-center">
            <p className="text-4xl">👏</p>
            <p className="mt-2 font-extrabold text-ink">
              {finished.correct} von {finished.total} richtig
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                variant="soft"
                className="w-full"
                onClick={() => start(pool, title, accent)}
              >
                Nochmal 🔁
              </Button>
              <Button className="w-full" onClick={() => setPool(null)}>
                Fertig
              </Button>
            </div>
          </Card>
        ) : (
          <ExerciseStepper
            exercises={pool}
            accentButton={accent}
            onFinish={(r) => {
              touchStreak();
              setFinished(r);
              window.scrollTo({ top: 0 });
            }}
          />
        )}
      </div>
    );
  }

  const allExercises = readyModules.flatMap((m) => m.uebungen);

  return (
    <div className="px-4 pt-6">
      <header className="mb-5">
        <h1 className="text-2xl font-extrabold text-ink">Üben ✏️</h1>
        <p className="text-slate-500">
          Such dir ein Thema aus – oder misch alles bunt zusammen.
        </p>
      </header>

      <button
        onClick={() =>
          start(allExercises, "Bunt gemischt", "bg-ink text-white")
        }
        className="mb-4 flex w-full items-center gap-3 rounded-xl2 border border-ink bg-ink p-4 text-left text-white active:scale-[0.99]"
      >
        <span className="text-2xl">🎲</span>
        <div>
          <p className="font-extrabold">Bunt gemischt</p>
          <p className="text-sm text-white/80">
            Alle Aufgaben quer durcheinander
          </p>
        </div>
      </button>

      <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-slate-400">
        Nach Thema
      </h2>
      <div className="space-y-3">
        {readyModules.map((m) => {
          const theme = familyTheme[m.family];
          return (
            <button
              key={m.slug}
              onClick={() => start(m.uebungen, m.title, theme.button)}
              className="flex w-full items-center gap-3 rounded-xl2 border border-slate-200 bg-white p-3 text-left shadow-sm active:scale-[0.99]"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-2xl text-xl ${theme.soft}`}
              >
                {m.emoji}
              </span>
              <div className="flex-1">
                <p className="font-extrabold text-ink">{m.title}</p>
                <p className="text-sm text-slate-500">
                  {m.uebungen.length} Aufgaben
                </p>
              </div>
              <span className="text-slate-300">›</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        Bereit für den Ernstfall?{" "}
        <Link href="/probeklausur" className="font-bold text-ink underline">
          Zur Probeklausur
        </Link>
      </p>
    </div>
  );
}
