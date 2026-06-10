"use client";

import { useMemo, useState } from "react";
import type { WertetabelleExercise } from "@/lib/types";
import { valueTable } from "@/lib/math/valueTable";
import { classifyFamily, fmtG, parseNum } from "@/lib/math/powerFunctions";
import { familyTheme } from "@/lib/theme";
import { Button } from "@/components/ui";
import { InlineMath } from "@/components/MathText";
import { FunctionPlot, type PlotPoint } from "@/components/graph/FunctionPlot";
import {
  type ExerciseCommonProps,
  FeedbackBanner,
  HintToggle,
  Prompt,
  SolutionBox,
} from "@/components/exercises/shared";

function cellOk(input: string, correctY: number, defined: boolean): boolean {
  const v = parseNum(input);
  if (!defined) return input.trim() === "" || input.trim() === "—";
  if (v === null) return false;
  return Math.abs(v - correctY) <= 0.05;
}

export function WertetabelleFill({
  exercise,
  examMode,
  forceReveal,
  onResult,
}: { exercise: WertetabelleExercise } & ExerciseCommonProps) {
  const table = useMemo(
    () => valueTable(exercise.fn, exercise.xs),
    [exercise],
  );
  const [vals, setVals] = useState<string[]>(() => exercise.xs.map(() => ""));
  const [checked, setChecked] = useState(false);

  const theme = familyTheme[classifyFamily(exercise.fn)];

  const revealed = forceReveal || checked;
  const allOk = table.every((t, i) => cellOk(vals[i] ?? "", t.y, t.defined));

  const shown = forceReveal
    ? table.map((t) => (t.defined ? fmtG(t.y) : "—"))
    : vals;

  const handleCheck = () => {
    setChecked(true);
    onResult?.(allOk);
  };

  // Plotbereich bestimmen
  const ys = table.filter((t) => t.defined).map((t) => t.y);
  const xMin = Math.floor(Math.min(0, ...exercise.xs));
  const xMax = Math.ceil(Math.max(0, ...exercise.xs));
  let yMin = Math.floor(Math.min(0, ...ys));
  let yMax = Math.ceil(Math.max(0, ...ys));
  yMax = Math.min(yMax, 10);
  yMin = Math.max(yMin, -10);
  if (yMax - yMin < 4) yMax = yMin + 4;

  const points: PlotPoint[] = table
    .filter((t) => t.defined)
    .map((t) => ({ x: t.x, y: t.y, color: theme.stroke }));

  return (
    <div className="space-y-3">
      <Prompt>{exercise.prompt}</Prompt>
      <div className="text-center">
        <InlineMath tex={exercise.termTex} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-sm">
          <tbody>
            <tr>
              <th className="border border-slate-300 bg-slate-100 px-2 py-2 font-bold">
                x
              </th>
              {exercise.xs.map((x, i) => (
                <td
                  key={i}
                  className="border border-slate-300 bg-slate-50 px-2 py-2 font-semibold"
                >
                  {fmtG(x)}
                </td>
              ))}
            </tr>
            <tr>
              <th className="border border-slate-300 bg-slate-100 px-2 py-2 font-bold">
                f(x)
              </th>
              {exercise.xs.map((x, i) => {
                const ok = cellOk(vals[i] ?? "", table[i].y, table[i].defined);
                const showState = checked && !forceReveal;
                return (
                  <td
                    key={i}
                    className={`border border-slate-300 px-1 py-1 ${
                      showState
                        ? ok
                          ? "bg-emerald-50"
                          : "bg-rose-50"
                        : "bg-white"
                    }`}
                  >
                    <input
                      inputMode="decimal"
                      value={shown[i] ?? ""}
                      disabled={forceReveal}
                      onChange={(e) => {
                        const next = [...vals];
                        next[i] = e.target.value;
                        setVals(next);
                      }}
                      className="w-14 rounded-md border border-slate-200 bg-transparent px-1 py-1.5 text-center outline-none focus:border-slate-400"
                      placeholder="?"
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <HintToggle hint={exercise.hint} />

      {!forceReveal && (
        <Button
          onClick={handleCheck}
          className={`w-full ${theme.button}`}
          disabled={vals.every((v) => v.trim() === "")}
        >
          Prüfen
        </Button>
      )}

      {checked && !forceReveal && (
        <FeedbackBanner
          status={examMode ? "saved" : allOk ? "correct" : "wrong"}
        />
      )}

      {revealed && (
        <>
          {(exercise.drawAfter ?? true) && (
            <div className="rounded-xl2 border border-slate-200 bg-white p-2">
              <p className="mb-1 text-center text-sm font-bold text-slate-500">
                So sieht der Graph aus 👇
              </p>
              <FunctionPlot
                curves={[{ fn: exercise.fn, stroke: theme.stroke }]}
                points={points}
                xRange={[xMin, xMax]}
                yRange={[yMin, yMax]}
              />
            </div>
          )}
          {!examMode && (
            <SolutionBox defaultOpen={!allOk && !forceReveal}>
              <p>Die richtigen Werte sind:</p>
              <div className="overflow-x-auto">
                <table className="border-collapse text-center text-sm">
                  <tbody>
                    <tr>
                      <th className="border border-slate-300 bg-slate-100 px-2 py-1">
                        x
                      </th>
                      {exercise.xs.map((x, i) => (
                        <td key={i} className="border border-slate-300 px-2 py-1">
                          {fmtG(x)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="border border-slate-300 bg-slate-100 px-2 py-1">
                        f(x)
                      </th>
                      {table.map((t, i) => (
                        <td
                          key={i}
                          className="border border-slate-300 px-2 py-1 font-semibold"
                        >
                          {t.defined ? fmtG(t.y) : "—"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </SolutionBox>
          )}
        </>
      )}
    </div>
  );
}
