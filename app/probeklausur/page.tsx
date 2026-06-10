"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { probeklausur, examTotalPoints } from "@/content/probeklausur";
import { useProgress } from "@/lib/progress/useProgress";
import { Button, Card, Pill } from "@/components/ui";
import { ExerciseRenderer } from "@/components/exercises/ExerciseRenderer";

type Phase = "intro" | "run" | "result";

const abColor: Record<1 | 2 | 3, string> = {
  1: "bg-emerald-100 text-emerald-700",
  2: "bg-amber-100 text-amber-700",
  3: "bg-rose-100 text-rose-700",
};

function noteFor(pct: number): number {
  if (pct >= 92) return 1;
  if (pct >= 81) return 2;
  if (pct >= 67) return 3;
  if (pct >= 50) return 4;
  if (pct >= 30) return 5;
  return 6;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function ProbeklausurPage() {
  const { recordExam } = useProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctMap, setCorrectMap] = useState<Record<number, boolean>>({});
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (phase !== "run") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const start = () => {
    setPhase("run");
    setIdx(0);
    setAnswered(false);
    setCorrectMap({});
    setSeconds(0);
    window.scrollTo({ top: 0 });
  };

  const task = probeklausur[idx];
  const last = idx === probeklausur.length - 1;

  const earned = probeklausur.reduce(
    (sum, t, i) => sum + (correctMap[i] ? t.points : 0),
    0,
  );
  const pct = Math.round((earned / examTotalPoints) * 100);

  const next = () => {
    if (last) {
      recordExam(pct);
      setPhase("result");
      window.scrollTo({ top: 0 });
      return;
    }
    setIdx((i) => i + 1);
    setAnswered(false);
    window.scrollTo({ top: 0 });
  };

  /* ---------------- Intro ---------------- */
  if (phase === "intro") {
    return (
      <div className="px-4 pt-6">
        <header className="mb-5">
          <h1 className="text-2xl font-extrabold text-ink">Probeklausur 📝</h1>
          <p className="text-slate-500">
            So ähnlich könnte deine echte Klassenarbeit aussehen.
          </p>
        </header>
        <Card className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500">Aufgaben</span>
            <span className="font-extrabold text-ink">
              {probeklausur.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Punkte gesamt</span>
            <span className="font-extrabold text-ink">{examTotalPoints}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Schwierigkeit</span>
            <span className="flex gap-1">
              <Pill className={abColor[1]}>AB1</Pill>
              <Pill className={abColor[2]}>AB2</Pill>
              <Pill className={abColor[3]}>AB3</Pill>
            </span>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
            🔕 Während der Klausur bekommst du <b>keine</b> Rückmeldung. Erst am
            Ende siehst du dein Ergebnis – und für jede Aufgabe den
            Lösungsweg.
          </div>
          <Button onClick={start} className="w-full">
            Klausur starten
          </Button>
        </Card>
        <p className="mt-4 text-center text-sm text-slate-400">
          Lieber erst weiterüben?{" "}
          <Link href="/ueben" className="font-bold text-ink underline">
            Zurück zum Üben
          </Link>
        </p>
      </div>
    );
  }

  /* ---------------- Run ---------------- */
  if (phase === "run") {
    return (
      <div className="px-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-400">
            Aufgabe {idx + 1}/{probeklausur.length}
          </span>
          <span className="font-mono text-sm font-bold text-slate-500">
            ⏱ {fmtTime(seconds)}
          </span>
        </div>
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-ink transition-all"
            style={{ width: `${(idx / probeklausur.length) * 100}%` }}
          />
        </div>

        <Card>
          <div className="mb-2 flex items-center gap-2">
            <Pill className={abColor[task.ab]}>AB{task.ab}</Pill>
            <Pill className="bg-slate-100 text-slate-600">
              {task.points} {task.points === 1 ? "Punkt" : "Punkte"}
            </Pill>
          </div>
          <ExerciseRenderer
            key={task.exercise.id}
            exercise={task.exercise}
            examMode
            onResult={(c) => {
              setAnswered(true);
              setCorrectMap((m) => ({ ...m, [idx]: c }));
            }}
          />
        </Card>

        <Button onClick={next} disabled={!answered} className="mt-3 w-full">
          {last ? "Abgeben & auswerten" : "Weiter →"}
        </Button>
      </div>
    );
  }

  /* ---------------- Result ---------------- */
  const note = noteFor(pct);
  return (
    <div className="px-4 pt-6">
      <Card className="animate-slide-up text-center">
        <p className="text-5xl">{pct >= 50 ? "🎉" : "💪"}</p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink">
          {earned} / {examTotalPoints} Punkte
        </h1>
        <p className="text-slate-500">
          Das sind {pct}% · ungefähr Note {note}
        </p>
        <p className="mt-1 text-sm text-slate-400">Zeit: {fmtTime(seconds)}</p>
        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={start} variant="soft" className="w-full">
            Neue Probeklausur 🔁
          </Button>
          <Link href="/" className="w-full">
            <Button className="w-full">Zum Lernpfad</Button>
          </Link>
        </div>
      </Card>

      <h2 className="mb-3 mt-6 text-sm font-extrabold uppercase tracking-wide text-slate-400">
        Lösungen zum Nachschauen
      </h2>
      <div className="space-y-3">
        {probeklausur.map((t, i) => (
          <Card key={t.exercise.id}>
            <div className="mb-2 flex items-center gap-2">
              <Pill
                className={
                  correctMap[i]
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }
              >
                {correctMap[i] ? `✓ ${t.points} P.` : "✗ 0 P."}
              </Pill>
              <Pill className={abColor[t.ab]}>AB{t.ab}</Pill>
            </div>
            <ExerciseRenderer exercise={t.exercise} forceReveal />
          </Card>
        ))}
      </div>
    </div>
  );
}
