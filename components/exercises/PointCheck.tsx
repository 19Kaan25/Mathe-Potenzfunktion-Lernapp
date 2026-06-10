"use client";

import { useState } from "react";
import type { PointCheckExercise } from "@/lib/types";
import { classifyFamily, evalFn, fmtG } from "@/lib/math/powerFunctions";
import { familyTheme } from "@/lib/theme";
import { InlineMath } from "@/components/MathText";
import { FunctionPlot, type PlotPoint } from "@/components/graph/FunctionPlot";
import {
  type ExerciseCommonProps,
  FeedbackBanner,
  HintToggle,
  Prompt,
  SolutionBox,
} from "@/components/exercises/shared";

export function PointCheck({
  exercise,
  examMode,
  forceReveal,
  onResult,
}: { exercise: PointCheckExercise } & ExerciseCommonProps) {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);

  const theme = familyTheme[classifyFamily(exercise.fn)];
  const fx = evalFn(exercise.fn, exercise.point.x);
  const onGraph = Number.isFinite(fx)
    ? Math.abs(fx - exercise.point.y) <= 0.01
    : false;

  const isCorrect = answer === onGraph;
  const reveal = forceReveal || checked;

  const choose = (val: boolean) => {
    if (reveal) return;
    setAnswer(val);
    setChecked(true);
    onResult?.(val === onGraph);
  };

  const xMin = Math.floor(Math.min(-3, exercise.point.x - 1));
  const xMax = Math.ceil(Math.max(3, exercise.point.x + 1));
  const yMin = Math.max(-10, Math.floor(Math.min(-3, exercise.point.y - 1)));
  const yMax = Math.min(10, Math.ceil(Math.max(3, exercise.point.y + 1)));

  const points: PlotPoint[] = [
    {
      x: exercise.point.x,
      y: exercise.point.y,
      color: onGraph ? theme.stroke : "#e11d48",
      label: "P",
      hollow: !onGraph,
    },
  ];
  if (!onGraph && Number.isFinite(fx)) {
    points.push({ x: exercise.point.x, y: fx, color: theme.stroke });
  }

  return (
    <div className="space-y-3">
      <Prompt>{exercise.prompt}</Prompt>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
        <InlineMath tex={exercise.termTex} />
        <InlineMath
          tex={`P(${fmtG(exercise.point.x)} \\mid ${fmtG(exercise.point.y)})`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={reveal}
          onClick={() => choose(true)}
          className={`rounded-xl2 border-2 p-3 font-extrabold transition ${
            reveal && onGraph
              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
              : answer === true
                ? "border-ink bg-ink text-white"
                : "border-slate-200 bg-white text-ink"
          }`}
        >
          ✅ Liegt drauf
        </button>
        <button
          type="button"
          disabled={reveal}
          onClick={() => choose(false)}
          className={`rounded-xl2 border-2 p-3 font-extrabold transition ${
            reveal && !onGraph
              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
              : answer === false
                ? "border-ink bg-ink text-white"
                : "border-slate-200 bg-white text-ink"
          }`}
        >
          ❌ Liegt nicht drauf
        </button>
      </div>

      <HintToggle hint={exercise.hint} />

      {checked && !forceReveal && (
        <FeedbackBanner
          status={examMode ? "saved" : isCorrect ? "correct" : "wrong"}
        />
      )}

      {reveal && !examMode && (
        <>
          <div className="rounded-xl2 border border-slate-200 bg-white p-2">
            <FunctionPlot
              curves={[{ fn: exercise.fn, stroke: theme.stroke }]}
              points={points}
              xRange={[xMin, xMax]}
              yRange={[yMin, yMax]}
            />
          </div>
          <SolutionBox defaultOpen={!isCorrect && !forceReveal}>
            <p>Setze die x-Koordinate des Punktes in die Funktion ein:</p>
            <InlineMath
              tex={`f(${fmtG(exercise.point.x)}) = ${fmtG(fx)}`}
            />
            <p>
              Der Punkt hat den y-Wert{" "}
              <b>{fmtG(exercise.point.y)}</b>.{" "}
              {onGraph ? (
                <>
                  Beide Werte sind gleich → der Punkt{" "}
                  <b>liegt auf dem Graphen</b>.
                </>
              ) : (
                <>
                  Die Werte sind verschieden → der Punkt{" "}
                  <b>liegt nicht auf dem Graphen</b>.
                </>
              )}
            </p>
          </SolutionBox>
        </>
      )}
    </div>
  );
}
