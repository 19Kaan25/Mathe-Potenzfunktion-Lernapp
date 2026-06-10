"use client";

import { useMemo, useState } from "react";
import type { PropertyExercise, PropertyPart } from "@/lib/types";
import { classifyFamily, properties } from "@/lib/math/powerFunctions";
import { familyTheme } from "@/lib/theme";
import { Button } from "@/components/ui";
import { InlineMath } from "@/components/MathText";
import {
  type ExerciseCommonProps,
  FeedbackBanner,
  HintToggle,
  Prompt,
} from "@/components/exercises/shared";

const DOMAIN_POOL = [
  "\\mathbb{R}",
  "\\mathbb{R}\\setminus\\{0\\}",
  "[0;\\,\\infty)",
  "(0;\\,\\infty)",
];
const RANGE_POOL = [
  "\\mathbb{R}",
  "\\mathbb{R}\\setminus\\{0\\}",
  "[0;\\,\\infty)",
  "(0;\\,\\infty)",
  "(-\\infty;\\,0]",
];
const SYM_OPTIONS: { label: string; key: "achse" | "punkt" | "keine" }[] = [
  { label: "Achsensymmetrisch zur y-Achse", key: "achse" },
  { label: "Punktsymmetrisch zum Ursprung", key: "punkt" },
  { label: "Keine Symmetrie", key: "keine" },
];

function buildOptions(correct: string, pool: string[]): string[] {
  const opts = [correct, ...pool.filter((p) => p !== correct)].slice(0, 4);
  // stabil sortieren, damit kein Hydration-Mismatch entsteht
  return opts.sort((a, b) => a.localeCompare(b));
}

function partLabel(p: PropertyPart): string {
  switch (p.type) {
    case "domain":
      return "Definitionsbereich D";
    case "range":
      return "Wertebereich W";
    case "symmetry":
      return "Symmetrie";
    case "monotonie":
      return "Monotonie";
  }
}

export function PropertyPicker({
  exercise,
  examMode,
  forceReveal,
  onResult,
}: { exercise: PropertyExercise } & ExerciseCommonProps) {
  const props = useMemo(() => properties(exercise.fn), [exercise.fn]);
  const theme = familyTheme[classifyFamily(exercise.fn)];

  // pro Teil: ausgewählter Optionswert (string)
  const [sel, setSel] = useState<Record<number, string | null>>(() =>
    Object.fromEntries(exercise.parts.map((_, i) => [i, null])),
  );
  const [checked, setChecked] = useState(false);
  const reveal = forceReveal || checked;

  const partData = exercise.parts.map((part) => {
    if (part.type === "domain") {
      return {
        kind: "tex" as const,
        options: buildOptions(props.domainTex, DOMAIN_POOL),
        correct: props.domainTex,
      };
    }
    if (part.type === "range") {
      return {
        kind: "tex" as const,
        options: buildOptions(props.rangeTex, RANGE_POOL),
        correct: props.rangeTex,
      };
    }
    if (part.type === "symmetry") {
      return {
        kind: "text" as const,
        options: SYM_OPTIONS.map((o) => o.label),
        correct: SYM_OPTIONS.find((o) => o.key === props.symmetry)!.label,
      };
    }
    return {
      kind: "text" as const,
      options: part.options,
      correct: part.options[part.correct],
    };
  });

  const allCorrect = exercise.parts.every(
    (_, i) => sel[i] === partData[i].correct,
  );

  const handleCheck = () => {
    setChecked(true);
    onResult?.(allCorrect);
  };

  return (
    <div className="space-y-3">
      <Prompt>{exercise.prompt}</Prompt>
      <div className="text-center">
        <InlineMath tex={exercise.termTex} />
      </div>

      <div className="space-y-3">
        {exercise.parts.map((part, pi) => {
          const data = partData[pi];
          const chosen = forceReveal ? data.correct : sel[pi];
          return (
            <div key={pi}>
              <p className="mb-1 text-sm font-extrabold text-slate-500">
                {partLabel(part)}
              </p>
              <div className="flex flex-wrap gap-2">
                {data.options.map((opt) => {
                  const active = chosen === opt;
                  const showRight = reveal && opt === data.correct;
                  const showWrong = reveal && active && opt !== data.correct;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={reveal}
                      onClick={() => setSel((s) => ({ ...s, [pi]: opt }))}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                        showRight
                          ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                          : showWrong
                            ? "border-rose-300 bg-rose-50 text-rose-700"
                            : active
                              ? "border-ink bg-ink text-white"
                              : "border-slate-200 bg-white text-ink"
                      }`}
                    >
                      {data.kind === "tex" ? <InlineMath tex={opt} /> : opt}
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
          className={`w-full ${theme.button}`}
          disabled={exercise.parts.some((_, i) => !sel[i])}
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
