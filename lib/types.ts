import type { ComponentType } from "react";

/**
 * Allgemeine Potenz-/Wurzelfunktion:
 *   f(x) = a · (x − c)^n + d
 * n darf ganzzahlig (auch negativ) oder gebrochen sein.
 * Wurzelfunktionen werden als gebrochener Exponent dargestellt:
 *   √x  = x^(1/2),  ∛x = x^(1/3)  →  n = 1/2 bzw. 1/3.
 */
export interface PowerFn {
  a?: number; // Streckung/Stauchung & Spiegelung (Standard 1)
  n: number; // Exponent
  c?: number; // horizontale Verschiebung (x − c)
  d?: number; // vertikale Verschiebung
}

export type Family =
  | "gerade"
  | "ungerade"
  | "negativ"
  | "wurzel"
  | "linear"
  | "andere";

/* ------------------------------------------------------------------ */
/* Übungen (Aufgabentypen)                                            */
/* ------------------------------------------------------------------ */

interface ExerciseBase {
  id: string;
  prompt: string; // unterstützt Inline-Mathe mit $...$
  hint?: string;
}

export interface WertetabelleExercise extends ExerciseBase {
  kind: "wertetabelle";
  fn: PowerFn;
  termTex: string; // z.B. "f(x) = x^2"
  xs: number[];
  /** Graph nach dem Ausfüllen zeigen (Standard true) */
  drawAfter?: boolean;
}

export interface GraphMatchExercise extends ExerciseBase {
  kind: "graphMatch";
  items: { id: string; fn: PowerFn; termTex: string }[];
}

export interface MultipleChoiceExercise extends ExerciseBase {
  kind: "mc";
  graphFn?: PowerFn; // optionaler Graph zur Aufgabe
  options: { tex?: string; text?: string; correct: boolean; why?: string }[];
  multi?: boolean;
}

export interface EquationExercise extends ExerciseBase {
  kind: "equation";
  equationTex: string; // Anzeige, z.B. "x^3 = 125"
  /** Gleichung der Form  a · x^n + b = rhs  */
  solve: { a?: number; n: number; b?: number; rhs: number };
}

export interface PointCheckExercise extends ExerciseBase {
  kind: "pointCheck";
  fn: PowerFn;
  termTex: string;
  point: { x: number; y: number };
}

export type Exercise =
  | WertetabelleExercise
  | GraphMatchExercise
  | MultipleChoiceExercise
  | EquationExercise
  | PointCheckExercise;

/* ------------------------------------------------------------------ */
/* Module & Probeklausur                                              */
/* ------------------------------------------------------------------ */

export interface LernModul {
  id: string;
  slug: string;
  title: string;
  short: string; // kurzes Label für den Lernpfad
  subtitle: string;
  emoji: string;
  family: Family;
  Lernzettel: ComponentType;
  uebungen: Exercise[];
}

export interface ExamTask {
  exercise: Exercise;
  points: number;
  ab: 1 | 2 | 3; // Anforderungsbereich
}
