"use client";

import { useMemo, useState } from "react";
import type { GraphMatchExercise } from "@/lib/types";
import { classifyFamily } from "@/lib/math/powerFunctions";
import { familyTheme } from "@/lib/theme";
import { Button } from "@/components/ui";
import { InlineMath } from "@/components/MathText";
import { FunctionPlot } from "@/components/graph/FunctionPlot";
import {
  type ExerciseCommonProps,
  FeedbackBanner,
  HintToggle,
  Prompt,
} from "@/components/exercises/shared";

export function GraphMatch({
  exercise,
  examMode,
  forceReveal,
  onResult,
}: { exercise: GraphMatchExercise } & ExerciseCommonProps) {
  // Term-Pool deterministisch sortiert (kein Hydration-Mismatch)
  const terms = useMemo(
    () =>
      exercise.items
        .map((it) => it.termTex)
        .slice()
        .sort((a, b) => a.localeCompare(b)),
    [exercise.items],
  );

  const [sel, setSel] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(exercise.items.map((it) => [it.id, null])),
  );
  const [checked, setChecked] = useState(false);

  const reveal = forceReveal || checked;
  const allCorrect = exercise.items.every(
    (it) => sel[it.id] === it.termTex,
  );

  const letters = ["A", "B", "C", "D", "E", "F"];

  const handleCheck = () => {
    setChecked(true);
    onResult?.(allCorrect);
  };

  return (
    <div className="space-y-3">
      <Prompt>{exercise.prompt}</Prompt>

      <div className="grid grid-cols-2 gap-3">
        {exercise.items.map((it, idx) => {
          const theme = familyTheme[classifyFamily(it.fn)];
          const chosen = forceReveal ? it.termTex : sel[it.id];
          const correctHere = chosen === it.termTex;
          return (
            <div
              key={it.id}
              className={`rounded-xl2 border bg-white p-2 ${
                reveal
                  ? correctHere
                    ? "border-emerald-300"
                    : "border-rose-300"
                  : "border-slate-200"
              }`}
            >
              <div className="mb-1 text-xs font-extrabold text-slate-400">
                {letters[idx]}
              </div>
              <FunctionPlot
                curves={[{ fn: it.fn, stroke: theme.stroke }]}
                xRange={[-3, 3]}
                yRange={[-3, 3]}
                unit={18}
              />
              <div className="mt-2 flex flex-wrap gap-1">
                {terms.map((t) => {
                  const active = chosen === t;
                  const showRight = reveal && t === it.termTex;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={reveal}
                      onClick={() =>
                        setSel((s) => ({ ...s, [it.id]: t }))
                      }
                      className={`rounded-lg border px-2 py-1 text-xs transition ${
                        showRight
                          ? "border-emerald-400 bg-emerald-50"
                          : active
                            ? "border-ink bg-ink text-white"
                            : "border-slate-200 bg-white"
                      }`}
                    >
                      <InlineMath tex={t} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <HintToggle hint={exercise.hint} />

      {!forceReveal && (
        <Button
          onClick={handleCheck}
          className="w-full"
          disabled={exercise.items.some((it) => !sel[it.id])}
        >
          Prüfen
        </Button>
      )}

      {checked && !forceReveal && (
        <FeedbackBanner
          status={examMode ? "saved" : allCorrect ? "correct" : "wrong"}
        />
      )}
    </div>
  );
}
