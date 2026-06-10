import type { ExamTask } from "@/lib/types";

/**
 * Probeklausur: gemischte Aufgaben über alle bisher gebauten Typen,
 * AB1–AB3, mit Punkten – angelehnt an Niveau & Stil der Beispielklausur.
 */
export const probeklausur: ExamTask[] = [
  {
    points: 4,
    ab: 1,
    exercise: {
      kind: "wertetabelle",
      id: "pk-1",
      prompt: "Aufgabe 1 – Erstelle die Wertetabelle.",
      termTex: "f(x) = x^2",
      fn: { n: 2 },
      xs: [-2, -1, 0, 1, 2],
    },
  },
  {
    points: 2,
    ab: 1,
    exercise: {
      kind: "mc",
      id: "pk-2",
      prompt: "Aufgabe 2 – Welche Symmetrie hat $f(x)=x^4$?",
      options: [
        { text: "Achsensymmetrisch zur y-Achse", correct: true, why: "Gerade Hochzahl → $f(-x)=f(x)$." },
        { text: "Punktsymmetrisch zum Ursprung", correct: false },
        { text: "Keine Symmetrie", correct: false },
      ],
    },
  },
  {
    points: 3,
    ab: 2,
    exercise: {
      kind: "pointCheck",
      id: "pk-3",
      prompt: "Aufgabe 3 – Liegt der Punkt auf dem Graphen?",
      termTex: "f(x) = x^3",
      fn: { n: 3 },
      point: { x: -2, y: -8 },
    },
  },
  {
    points: 3,
    ab: 1,
    exercise: {
      kind: "equation",
      id: "pk-4",
      prompt: "Aufgabe 4 – Bestimme die Lösungsmenge.",
      equationTex: "x^3 = 125",
      solve: { n: 3, rhs: 125 },
    },
  },
  {
    points: 3,
    ab: 2,
    exercise: {
      kind: "equation",
      id: "pk-5",
      prompt: "Aufgabe 5 – Bestimme die Lösungsmenge. Aufgepasst!",
      equationTex: "x^4 = -2",
      solve: { n: 4, rhs: -2 },
    },
  },
  {
    points: 4,
    ab: 2,
    exercise: {
      kind: "graphMatch",
      id: "pk-6",
      prompt: "Aufgabe 6 – Ordne jedem Graphen den richtigen Term zu.",
      items: [
        { id: "a", fn: { n: 2 }, termTex: "x^2" },
        { id: "b", fn: { n: 3 }, termTex: "x^3" },
        { id: "c", fn: { n: 0.5 }, termTex: "\\sqrt{x}" },
        { id: "d", fn: { a: -1, n: 2 }, termTex: "-x^2" },
      ],
    },
  },
  {
    points: 3,
    ab: 2,
    exercise: {
      kind: "mc",
      id: "pk-7",
      prompt: "Aufgabe 7 – Welche Aussagen stimmen für $f(x)=\\sqrt{x}$?",
      multi: true,
      options: [
        { text: "D = [0; ∞)", correct: true },
        { text: "W = [0; ∞)", correct: true },
        { text: "monoton steigend", correct: true },
        { text: "achsensymmetrisch zur y-Achse", correct: false },
      ],
    },
  },
  {
    points: 3,
    ab: 3,
    exercise: {
      kind: "mc",
      id: "pk-8",
      prompt:
        "Aufgabe 8 – Welcher Term gehört zum gezeigten Graphen? Begründe deine Wahl.",
      graphFn: { a: -2, n: 2 },
      options: [
        {
          tex: "f(x) = -2x^2",
          correct: true,
          why: "Nach unten geöffnet (Minus) und gestreckt (Faktor 2).",
        },
        { tex: "f(x) = 2x^2", correct: false, why: "Das wäre nach oben geöffnet." },
        { tex: "f(x) = x^2", correct: false, why: "Nach oben geöffnet und nicht gestreckt." },
        { tex: "f(x) = -x^2", correct: false, why: "Richtige Richtung, aber nicht gestreckt genug." },
      ],
    },
  },
  {
    points: 4,
    ab: 3,
    exercise: {
      kind: "equation",
      id: "pk-9",
      prompt: "Aufgabe 9 – Bestimme die Lösungsmenge (runde auf 2 Stellen).",
      equationTex: "2x^6 - 10 = 10",
      solve: { a: 2, n: 6, b: -10, rhs: 10 },
    },
  },
  {
    points: 3,
    ab: 2,
    exercise: {
      kind: "property",
      id: "pk-10",
      prompt: "Aufgabe 10 – Bestimme Definitionsbereich, Wertebereich und Symmetrie.",
      termTex: "f(x) = x^{-2}",
      fn: { n: -2 },
      parts: [{ type: "domain" }, { type: "range" }, { type: "symmetry" }],
    },
  },
  {
    points: 2,
    ab: 2,
    exercise: {
      kind: "mc",
      id: "pk-11",
      prompt: "Aufgabe 11 – Wie lautet die Umkehrfunktion von $f(x)=x^3$?",
      options: [
        { tex: "\\sqrt[3]{x}", correct: true, why: "Die 3. Wurzel macht das Hoch-3 rückgängig." },
        { tex: "\\tfrac{1}{x^3}", correct: false, why: "Das ist der Kehrwert, nicht die Umkehrfunktion." },
        { tex: "x^3", correct: false },
        { tex: "3x", correct: false },
      ],
    },
  },
  {
    points: 3,
    ab: 3,
    exercise: {
      kind: "mc",
      id: "pk-12",
      prompt: "Aufgabe 12 – Welcher Term gehört zum Graphen? Begründe.",
      graphFn: { n: 2, c: 2 },
      options: [
        { tex: "(x-2)^2", correct: true, why: "Tiefster Punkt bei $x=2$ → nach rechts verschoben." },
        { tex: "(x+2)^2", correct: false, why: "Das läge bei $x=-2$." },
        { tex: "x^2-2", correct: false },
        { tex: "x^2+2", correct: false },
      ],
    },
  },
];

export const examTotalPoints = probeklausur.reduce(
  (s, t) => s + t.points,
  0,
);
