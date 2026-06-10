"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { modulesBySlug } from "@/content/modules";
import { familyTheme } from "@/lib/theme";
import { useProgress } from "@/lib/progress/useProgress";
import { Button, Card } from "@/components/ui";
import { ExerciseStepper } from "@/components/ExerciseStepper";

type Phase = "learn" | "practice" | "done";

export default function ModulePage() {
  const params = useParams<{ modul: string }>();
  const modul = modulesBySlug[params.modul];
  const { completeModule, touchStreak } = useProgress();
  const [phase, setPhase] = useState<Phase>("learn");
  const [result, setResult] = useState({ correct: 0, total: 0 });

  if (!modul) {
    return (
      <div className="px-4 pt-10 text-center">
        <p className="text-slate-500">Dieses Modul gibt es noch nicht.</p>
        <Link href="/" className="mt-4 inline-block font-bold underline">
          ← Zum Lernpfad
        </Link>
      </div>
    );
  }

  const theme = familyTheme[modul.family];
  const { Lernzettel } = modul;

  const stars =
    result.total === 0
      ? 1
      : result.correct === result.total
        ? 3
        : result.correct / result.total >= 0.6
          ? 2
          : 1;

  const finish = (r: { correct: number; total: number }) => {
    setResult(r);
    const s =
      r.total === 0
        ? 1
        : r.correct === r.total
          ? 3
          : r.correct / r.total >= 0.6
            ? 2
            : 1;
    completeModule(modul.slug, s);
    touchStreak();
    setPhase("done");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="px-4 pt-4">
      <div className="mb-4 flex items-center gap-2">
        <Link
          href="/"
          className="text-sm font-bold text-slate-400 hover:text-ink"
        >
          ← Pfad
        </Link>
      </div>

      <header className={`mb-4 rounded-xl2 ${theme.soft} p-4`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{modul.emoji}</span>
          <div>
            <h1 className="text-xl font-extrabold text-ink">{modul.title}</h1>
            <p className={`text-sm font-semibold ${theme.text}`}>
              {modul.subtitle}
            </p>
          </div>
        </div>
      </header>

      {phase === "learn" && (
        <>
          <Card className="mb-4">
            <Lernzettel />
          </Card>
          <Button
            onClick={() => {
              setPhase("practice");
              window.scrollTo({ top: 0 });
            }}
            className={`mb-2 w-full ${theme.button}`}
          >
            Jetzt üben 💪
          </Button>
        </>
      )}

      {phase === "practice" && (
        <>
          <button
            onClick={() => setPhase("learn")}
            className="mb-3 text-sm font-bold text-slate-400 hover:text-ink"
          >
            ↩︎ Nochmal den Lernzettel ansehen
          </button>
          <ExerciseStepper
            exercises={modul.uebungen}
            accentButton={theme.button}
            onFinish={finish}
          />
        </>
      )}

      {phase === "done" && (
        <Card className="animate-slide-up text-center">
          <p className="text-5xl">🎉</p>
          <h2 className="mt-2 text-xl font-extrabold text-ink">
            Modul geschafft!
          </h2>
          <p className="mt-1 text-slate-500">
            Du hast {result.correct} von {result.total} Aufgaben richtig.
          </p>
          <div className="my-3 text-3xl">
            {"⭐".repeat(stars)}
            <span className="text-slate-200">{"☆".repeat(3 - stars)}</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              onClick={() => {
                setResult({ correct: 0, total: 0 });
                setPhase("practice");
                window.scrollTo({ top: 0 });
              }}
              variant="soft"
              className="w-full"
            >
              Nochmal üben 🔁
            </Button>
            <Link href="/" className="w-full">
              <Button className={`w-full ${theme.button}`}>
                Zurück zum Lernpfad →
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
