import type { LernModul } from "@/lib/types";
import { InlineMath } from "@/components/MathText";
import { FunctionPlot } from "@/components/graph/FunctionPlot";
import {
  BildBox,
  MerkeBox,
  Section,
  StolperstelleBox,
} from "@/components/lernzettel/Boxes";

function Lernzettel() {
  return (
    <div>
      <Section title="Die Schüssel-Form" emoji="🥣">
        <p>
          Funktionen mit <b>gerader</b> Hochzahl – also{" "}
          <InlineMath tex="x^2" />, <InlineMath tex="x^4" />,{" "}
          <InlineMath tex="x^6" /> … – sehen alle aus wie eine{" "}
          <b>Schüssel</b> (oder ein Tal): Sie kommen von oben links runter,
          drehen unten um und gehen oben rechts wieder hoch.
        </p>
        <BildBox caption="Blau: x²  ·  gestrichelt: x⁴ (in der Mitte flacher, am Rand steiler)">
          <FunctionPlot
            curves={[
              { fn: { n: 2 }, stroke: "#0284c7" },
              { fn: { n: 4 }, stroke: "#0284c7", dashed: true, width: 2 },
            ]}
            xRange={[-2.5, 2.5]}
            yRange={[-0.5, 5]}
            highlightYAxis
          />
        </BildBox>
      </Section>

      <Section title="Was du dir merken musst" emoji="📌">
        <MerkeBox>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              Sie geht immer durch <InlineMath tex="(0\mid 0)" />,{" "}
              <InlineMath tex="(1\mid 1)" /> und{" "}
              <InlineMath tex="(-1\mid 1)" />.
            </li>
            <li>
              <b>Achsensymmetrisch</b> zur y-Achse: links ist das Spiegelbild
              von rechts. In Formeln: <InlineMath tex="f(-x)=f(x)" />.
            </li>
            <li>
              <b>Definitionsbereich</b> <InlineMath tex="D=\mathbb{R}" /> – du
              darfst <i>jede</i> Zahl einsetzen.
            </li>
            <li>
              <b>Wertebereich</b> <InlineMath tex="W=[0;\infty)" /> – es kommt{" "}
              <b>nie etwas Negatives</b> heraus.
            </li>
            <li>
              <b>Monotonie:</b> links fällt sie, rechts steigt sie.
            </li>
          </ul>
        </MerkeBox>
      </Section>

      <Section title="Achtung, typischer Fehler" emoji="⚠️">
        <StolperstelleBox>
          <InlineMath tex="(-3)^2 = 9" /> und <b>nicht</b>{" "}
          <InlineMath tex="-9" />! Bei einer geraden Hochzahl wird das Minus
          „aufgefressen". Deshalb liegt die ganze Schüssel <b>über</b> der
          x-Achse.
        </StolperstelleBox>
      </Section>
    </div>
  );
}

export const gerade: LernModul = {
  id: "gerade",
  slug: "gerade-exponenten",
  title: "Gerade Exponenten",
  short: "Gerade",
  subtitle: "x², x⁴ – die Schüssel-Form",
  emoji: "🥣",
  family: "gerade",
  uebungen: [
    {
      kind: "wertetabelle",
      id: "ge-1",
      prompt: "Fülle die Wertetabelle aus. Danach zeichnet die App den Graphen.",
      termTex: "f(x) = x^2",
      fn: { n: 2 },
      xs: [-2, -1, 0, 1, 2],
      hint: "Setze jedes x ein und quadriere. Denk dran: $(-2)^2 = 4$.",
    },
    {
      kind: "mc",
      id: "ge-2",
      prompt: "Welche Symmetrie hat $f(x)=x^4$?",
      graphFn: { n: 4 },
      options: [
        {
          text: "Achsensymmetrisch zur y-Achse",
          correct: true,
          why: "Gerade Hochzahl → $f(-x)=f(x)$, beide Seiten sind gleich.",
        },
        {
          text: "Punktsymmetrisch zum Ursprung",
          correct: false,
          why: "Das gilt nur bei ungeraden Hochzahlen (x³, x⁵ …).",
        },
        { text: "Gar keine Symmetrie", correct: false },
      ],
    },
    {
      kind: "pointCheck",
      id: "ge-3",
      prompt: "Liegt der Punkt P auf dem Graphen?",
      termTex: "f(x) = x^2",
      fn: { n: 2 },
      point: { x: -3, y: 9 },
      hint: "Rechne $f(-3)=(-3)^2$. Wird das Ergebnis positiv oder negativ?",
    },
    {
      kind: "mc",
      id: "ge-4",
      prompt: "Welche Aussagen stimmen für $f(x)=x^2$?",
      multi: true,
      options: [
        { text: "Definitionsbereich D = ℝ", correct: true },
        { text: "Wertebereich W = [0; ∞)", correct: true, why: "x² ist nie negativ." },
        { text: "Sie ist punktsymmetrisch", correct: false },
        { text: "Sie geht durch (1 | 1)", correct: true },
        { text: "Sie kann negative y-Werte haben", correct: false },
      ],
    },
    {
      kind: "equation",
      id: "ge-5",
      prompt: "Löse die Gleichung. Wie viele Lösungen gibt es?",
      equationTex: "x^2 = 9",
      solve: { n: 2, rhs: 9 },
      hint: "Welche Zahl mal sich selbst ergibt 9? Denk an Plus UND Minus.",
    },
    {
      kind: "equation",
      id: "ge-6",
      prompt: "Löse die Gleichung – aufgepasst!",
      equationTex: "x^2 = -4",
      solve: { n: 2, rhs: -4 },
      hint: "Kann $x^2$ überhaupt negativ werden?",
    },
  ],
  Lernzettel,
};
