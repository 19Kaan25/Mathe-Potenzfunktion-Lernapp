"use client";

import { useState } from "react";
import type { MultipleChoiceExercise } from "@/lib/types";
import { classifyFamily } from "@/lib/math/powerFunctions";
import { familyTheme } from "@/lib/theme";
import { Button } from "@/components/ui";
import { InlineMath, MathText } from "@/components/MathText";
import { FunctionPlot } from "@/components/graph/FunctionPlot";
import {
  type ExerciseCommonProps,
  FeedbackBanner,
  HintToggle,
  Prompt,
} from "@/components/exercises/shared";

export function MultipleChoice({
  exercise,
  examMode,
  forceReveal,
  onResult,
}: { exercise: MultipleChoiceExercise } & ExerciseCommonProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const multi = exercise.multi ?? false;

  const theme = exercise.graphFn
    ? familyTheme[classifyFamily(exercise.graphFn)]
    : familyTheme.andere;

  const toggle = (i: number) => {
    if (checked || forceReveal) return;
    if (multi) {
      setSelected((s) =>
        s.includes(i) ? s.filter((x) => x !== i) : [...s, i],
      );
    } else {
      setSelected([i]);
    }
  };

  const correctIdx = exercise.options
    .map((o, i) => (o.correct ? i : -1))
    .filter((i) => i >= 0);
  const isCorrect =
    selected.length === correctIdx.length &&
    selected.every((i) => correctIdx.includes(i));

  const reveal = forceReveal || checked;

  const handleCheck = () => {
    setChecked(true);
    onResult?.(isCorrect);
  };

  return (
    <div className="space-y-3">
      <Prompt>{exercise.prompt}</Prompt>

      {exercise.graphFn && (
        <div className="rounded-xl2 border border-slate-200 bg-white p-2">
          <FunctionPlot
            curves={[{ fn: exercise.graphFn, stroke: theme.stroke }]}
          />
        </div>
      )}

      {multi && (
        <p className="text-xs font-bold text-slate-400">
          Mehrere Antworten möglich.
        </p>
      )}

      <div className="space-y-2">
        {exercise.options.map((o, i) => {
          const sel = selected.includes(i);
          let cls = "border-slate-200 bg-white";
          if (reveal) {
            if (o.correct) cls = "border-emerald-300 bg-emerald-50";
            else if (sel) cls = "border-rose-300 bg-rose-50";
          } else if (sel) {
            cls = `${theme.border} ${theme.soft}`;
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              disabled={reveal}
              className={`flex w-full items-start gap-3 rounded-xl2 border p-3 text-left transition ${cls}`}
            >
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 text-xs font-bold ${
                  sel ? "border-ink bg-ink text-white" : "border-slate-300"
                }`}
              >
                {reveal && o.correct ? "✓" : sel ? "•" : ""}
              </span>
              <span className="flex-1 text-[15px] font-semibold text-ink">
                {o.tex ? <InlineMath tex={o.tex} /> : o.text}
                {reveal && o.why && (
                  <span className="mt-1 block text-sm font-normal text-slate-500">
                    <MathText>{o.why}</MathText>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <HintToggle hint={exercise.hint} />

      {!forceReveal && (
        <Button
          onClick={handleCheck}
          className={`w-full ${theme.button}`}
          disabled={selected.length === 0}
        >
          Prüfen
        </Button>
      )}

      {checked && !forceReveal && (
        <FeedbackBanner
          status={examMode ? "saved" : isCorrect ? "correct" : "wrong"}
        />
      )}
    </div>
  );
}
