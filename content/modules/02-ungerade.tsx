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
      <Section title="Die Rutschen-Form" emoji="🛝">
        <p>
          Funktionen mit <b>ungerader</b> Hochzahl –{" "}
          <InlineMath tex="x^3" />, <InlineMath tex="x^5" /> … – sehen aus wie
          eine <b>Rutsche</b> bzw. ein liegendes <b>S</b>: Sie kommen von unten
          links und gehen nach oben rechts – einmal komplett durch.
        </p>
        <BildBox caption="Grün: x³  ·  gestrichelt: x⁵">
          <FunctionPlot
            curves={[
              { fn: { n: 3 }, stroke: "#059669" },
              { fn: { n: 5 }, stroke: "#059669", dashed: true, width: 2 },
            ]}
            xRange={[-2, 2]}
            yRange={[-4, 4]}
          />
        </BildBox>
      </Section>

      <Section title="Was du dir merken musst" emoji="📌">
        <MerkeBox>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              Sie geht durch <InlineMath tex="(0\mid 0)" />,{" "}
              <InlineMath tex="(1\mid 1)" /> und{" "}
              <InlineMath tex="(-1\mid -1)" />.
            </li>
            <li>
              <b>Punktsymmetrisch</b> zum Ursprung: drehst du den Graphen um
              180°, sieht er gleich aus. In Formeln:{" "}
              <InlineMath tex="f(-x)=-f(x)" />.
            </li>
            <li>
              <b>Definitionsbereich</b> <InlineMath tex="D=\mathbb{R}" /> und{" "}
              <b>Wertebereich</b> <InlineMath tex="W=\mathbb{R}" /> – hier sind
              auch <i>negative</i> y-Werte dabei.
            </li>
            <li>
              <b>Monotonie:</b> immer steigend (von links unten nach rechts
              oben).
            </li>
          </ul>
        </MerkeBox>
      </Section>

      <Section title="Der große Unterschied zu x²" emoji="⚠️">
        <StolperstelleBox>
          <InlineMath tex="(-2)^3 = -8" /> – hier <b>bleibt</b> das Minus!
          Darum geht die Rutsche unter die x-Achse. Genau das unterscheidet
          ungerade von geraden Exponenten.
        </StolperstelleBox>
      </Section>
    </div>
  );
}

export const ungerade: LernModul = {
  id: "ungerade",
  slug: "ungerade-exponenten",
  title: "Ungerade Exponenten",
  short: "Ungerade",
  subtitle: "x³, x⁵ – die Rutschen-Form",
  emoji: "🛝",
  family: "ungerade",
  uebungen: [
    {
      kind: "wertetabelle",
      id: "un-1",
      prompt: "Fülle die Wertetabelle aus. Danach zeichnet die App den Graphen.",
      termTex: "f(x) = x^3",
      fn: { n: 3 },
      xs: [-2, -1, 0, 1, 2],
      hint: "Denk dran: $(-2)^3 = -8$ – das Minus bleibt!",
    },
    {
      kind: "mc",
      id: "un-2",
      prompt: "Welche Symmetrie hat $f(x)=x^3$?",
      graphFn: { n: 3 },
      options: [
        {
          text: "Punktsymmetrisch zum Ursprung",
          correct: true,
          why: "Ungerade Hochzahl → $f(-x)=-f(x)$.",
        },
        {
          text: "Achsensymmetrisch zur y-Achse",
          correct: false,
          why: "Das gilt nur bei geraden Hochzahlen.",
        },
        { text: "Gar keine Symmetrie", correct: false },
      ],
    },
    {
      kind: "pointCheck",
      id: "un-3",
      prompt: "Liegt der Punkt P auf dem Graphen?",
      termTex: "f(x) = x^3",
      fn: { n: 3 },
      point: { x: -2, y: -8 },
      hint: "Rechne $f(-2)=(-2)^3$.",
    },
    {
      kind: "mc",
      id: "un-4",
      prompt: "Welche Aussagen stimmen für $f(x)=x^3$?",
      multi: true,
      options: [
        { text: "Definitionsbereich D = ℝ", correct: true },
        { text: "Wertebereich W = ℝ", correct: true, why: "Auch negative y-Werte sind möglich." },
        { text: "Sie ist monoton steigend", correct: true },
        { text: "Sie ist achsensymmetrisch zur y-Achse", correct: false },
        { text: "Sie geht durch (-1 | -1)", correct: true },
      ],
    },
    {
      kind: "graphMatch",
      id: "un-5",
      prompt: "Ordne jedem Graphen den richtigen Term zu.",
      items: [
        { id: "g1", fn: { n: 2 }, termTex: "x^2" },
        { id: "g2", fn: { n: 3 }, termTex: "x^3" },
      ],
      hint: "Schüssel = gerade Hochzahl, Rutsche = ungerade Hochzahl.",
    },
    {
      kind: "equation",
      id: "un-6",
      prompt: "Löse die Gleichung.",
      equationTex: "x^3 = 125",
      solve: { n: 3, rhs: 125 },
      hint: "Welche Zahl hoch 3 ergibt 125? Probiere $5^3$.",
    },
    {
      kind: "equation",
      id: "un-7",
      prompt: "Löse die Gleichung.",
      equationTex: "x^3 = -27",
      solve: { n: 3, rhs: -27 },
      hint: "Bei ungerader Hochzahl ist eine negative Lösung erlaubt.",
    },
  ],
  Lernzettel,
};
