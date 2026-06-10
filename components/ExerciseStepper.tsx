"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";
import { ExerciseRenderer } from "@/components/exercises/ExerciseRenderer";
import { Button, Card } from "@/components/ui";

export function ExerciseStepper({
  exercises,
  accentButton,
  onFinish,
}: {
  exercises: Exercise[];
  accentButton?: string;
  onFinish?: (result: { correct: number; total: number }) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctMap, setCorrectMap] = useState<Record<number, boolean>>({});

  const total = exercises.length;
  const last = idx === total - 1;
  const ex = exercises[idx];

  const next = () => {
    if (last) {
      const correct = Object.values(correctMap).filter(Boolean).length;
      onFinish?.({ correct, total });
      return;
    }
    setIdx((i) => i + 1);
    setAnswered(false);
  };

  return (
    <div className="space-y-3">
      {/* Fortschrittspunkte */}
      <div className="flex items-center justify-center gap-1.5">
        {exercises.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === idx
                ? "w-6 bg-ink"
                : correctMap[i] !== undefined
                  ? "w-2 bg-emerald-400"
                  : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-xs font-bold text-slate-400">
        Aufgabe {idx + 1} von {total}
      </p>

      <Card>
        <ExerciseRenderer
          key={ex.id}
          exercise={ex}
          onResult={(correct) => {
            setAnswered(true);
            setCorrectMap((m) => ({ ...m, [idx]: correct }));
          }}
        />
      </Card>

      <Button
        onClick={next}
        disabled={!answered}
        className={`w-full ${answered ? accentButton ?? "" : ""}`}
      >
        {last ? "Fertig! 🎉" : "Weiter →"}
      </Button>
    </div>
  );
}
