"use client";

import { useMemo, useState } from "react";
import type { EquationExercise } from "@/lib/types";
import { solveEquation } from "@/lib/math/solveEquations";
import { parseNum } from "@/lib/math/powerFunctions";
import { Button } from "@/components/ui";
import { BlockMath } from "@/components/MathText";
import {
  type ExerciseCommonProps,
  FeedbackBanner,
  HintToggle,
  Prompt,
  SolutionBox,
} from "@/components/exercises/shared";

function parseSet(s: string): number[] {
  return s
    .split(/[;,\s]+/)
    .map((t) => parseNum(t))
    .filter((v): v is number => v !== null);
}

function setsEqual(user: number[], sol: number[]): boolean {
  if (user.length !== sol.length) return false;
  const used = new Array(sol.length).fill(false);
  return user.every((u) => {
    const idx = sol.findIndex((s, i) => !used[i] && Math.abs(u - s) <= 0.05);
    if (idx === -1) return false;
    used[idx] = true;
    return true;
  });
}

export function EquationSolver({
  exercise,
  examMode,
  forceReveal,
  onResult,
}: { exercise: EquationExercise } & ExerciseCommonProps) {
  const solution = useMemo(
    () => solveEquation(exercise.solve),
    [exercise.solve],
  );
  const [input, setInput] = useState("");
  const [noSol, setNoSol] = useState(false);
  const [checked, setChecked] = useState(false);

  const userSet = noSol ? [] : parseSet(input);
  const isCorrect = noSol
    ? solution.count === 0
    : solution.count > 0 && setsEqual(userSet, solution.solutions);

  const reveal = forceReveal || checked;

  const handleCheck = () => {
    setChecked(true);
    onResult?.(isCorrect);
  };

  return (
    <div className="space-y-3">
      <Prompt>{exercise.prompt}</Prompt>

      <div className="rounded-xl2 border border-slate-200 bg-white py-2">
        <BlockMath tex={exercise.equationTex} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-ink">x =</span>
          <input
            inputMode="text"
            value={noSol ? "" : input}
            disabled={noSol || forceReveal}
            onChange={(e) => setInput(e.target.value)}
            placeholder="z. B. 5  oder  5; -5"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-center text-base outline-none focus:border-slate-500 disabled:bg-slate-100"
          />
        </div>
        <button
          type="button"
          disabled={forceReveal}
          onClick={() => setNoSol((v) => !v)}
          className={`w-full rounded-xl border px-3 py-2 text-sm font-bold transition ${
            noSol
              ? "border-ink bg-ink text-white"
              : "border-slate-300 bg-white text-slate-600"
          }`}
        >
          {noSol ? "✓ " : ""}Keine Lösung (L = {"{ }"})
        </button>
        <p className="text-xs text-slate-400">
          Mehrere Lösungen mit Semikolon trennen, z. B. <b>5; -5</b>.
        </p>
      </div>

      <HintToggle hint={exercise.hint} />

      {!forceReveal && (
        <Button
          onClick={handleCheck}
          className="w-full"
          disabled={!noSol && userSet.length === 0}
        >
          Prüfen
        </Button>
      )}

      {checked && !forceReveal && (
        <FeedbackBanner
          status={examMode ? "saved" : isCorrect ? "correct" : "wrong"}
        />
      )}

      {reveal && !examMode && (
        <SolutionBox defaultOpen={!isCorrect && !forceReveal}>
          {solution.steps.map((s, i) => (
            <BlockMath key={i} tex={s} />
          ))}
          {solution.reason && (
            <p className="rounded-lg bg-amber-50 p-2 text-amber-900">
              {solution.reason}
            </p>
          )}
          <BlockMath tex={solution.setTex} />
        </SolutionBox>
      )}
    </div>
  );
}
