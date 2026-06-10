"use client";

import type { Exercise } from "@/lib/types";
import type { ExerciseCommonProps } from "@/components/exercises/shared";
import { WertetabelleFill } from "@/components/exercises/WertetabelleFill";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { EquationSolver } from "@/components/exercises/EquationSolver";
import { PointCheck } from "@/components/exercises/PointCheck";
import { GraphMatch } from "@/components/exercises/GraphMatch";

export function ExerciseRenderer({
  exercise,
  ...common
}: { exercise: Exercise } & ExerciseCommonProps) {
  switch (exercise.kind) {
    case "wertetabelle":
      return <WertetabelleFill exercise={exercise} {...common} />;
    case "mc":
      return <MultipleChoice exercise={exercise} {...common} />;
    case "equation":
      return <EquationSolver exercise={exercise} {...common} />;
    case "pointCheck":
      return <PointCheck exercise={exercise} {...common} />;
    case "graphMatch":
      return <GraphMatch exercise={exercise} {...common} />;
    default:
      return null;
  }
}
