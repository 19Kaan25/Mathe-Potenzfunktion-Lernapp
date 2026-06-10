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
      <Section title="Die halbe liegende Parabel" emoji="🌱">
        <p>
          Die Wurzelfunktion <InlineMath tex="f(x)=\sqrt{x}" /> macht das
          Quadrieren wieder <b>rückgängig</b>. Ihr Graph ist eine{" "}
          <b>halbe, liegende Parabel</b>: Sie startet bei{" "}
          <InlineMath tex="(0\mid 0)" /> und geht nur nach <b>rechts</b> – immer
          flacher werdend.
        </p>
        <BildBox caption="Lila: √x – beginnt bei 0 und steigt immer langsamer">
          <FunctionPlot
            curves={[{ fn: { n: 0.5 }, stroke: "#7c3aed" }]}
            xRange={[-1, 9]}
            yRange={[-1, 4]}
            unit={20}
            points={[
              { x: 0, y: 0, color: "#7c3aed" },
              { x: 1, y: 1, color: "#7c3aed", label: "(1|1)" },
              { x: 4, y: 2, color: "#7c3aed", label: "(4|2)" },
              { x: 9, y: 3, color: "#7c3aed", label: "(9|3)" },
            ]}
          />
        </BildBox>
      </Section>

      <Section title="Was du dir merken musst" emoji="📌">
        <MerkeBox>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <b>Definitionsbereich</b> <InlineMath tex="D=[0;\infty)" /> – du
              darfst <b>keine negativen Zahlen</b> einsetzen!
            </li>
            <li>
              <b>Wertebereich</b> <InlineMath tex="W=[0;\infty)" /> – es kommt
              nie etwas Negatives heraus.
            </li>
            <li>
              <b>Monoton steigend</b>, aber immer flacher.
            </li>
            <li>
              <b>Keine Symmetrie</b> (es gibt ja nur die rechte Seite).
            </li>
            <li>
              Schöne Punkte: <InlineMath tex="(1\mid 1)" />,{" "}
              <InlineMath tex="(4\mid 2)" />, <InlineMath tex="(9\mid 3)" />.
            </li>
          </ul>
        </MerkeBox>
      </Section>

      <Section title="Achtung, typischer Fehler" emoji="⚠️">
        <StolperstelleBox>
          <InlineMath tex="\sqrt{-4}" /> gibt es <b>nicht</b> (im Reellen)!
          Aus einer negativen Zahl kann man keine Wurzel ziehen. Darum hat die
          Wurzelfunktion <i>links</i> von 0 einfach gar keinen Graphen.
        </StolperstelleBox>
      </Section>
    </div>
  );
}

export const wurzel: LernModul = {
  id: "wurzel",
  slug: "wurzelfunktionen",
  title: "Wurzelfunktionen",
  short: "Wurzel",
  subtitle: "√x – die halbe liegende Parabel",
  emoji: "🌱",
  family: "wurzel",
  uebungen: [
    {
      kind: "wertetabelle",
      id: "wz-1",
      prompt: "Fülle die Wertetabelle aus. Tipp: Suche nach schönen Quadratzahlen!",
      termTex: "f(x) = \\sqrt{x}",
      fn: { n: 0.5 },
      xs: [0, 1, 4, 9],
      hint: "$\\sqrt{4}=2$, weil $2\\cdot2=4$. $\\sqrt{9}=3$, weil $3\\cdot3=9$.",
    },
    {
      kind: "mc",
      id: "wz-2",
      prompt: "Für welche x ist $\\sqrt{x}$ definiert?",
      options: [
        { tex: "x \\ge 0", correct: true, why: "Aus negativen Zahlen kann man keine Wurzel ziehen." },
        { tex: "\\text{für alle } x", correct: false, why: "Negative x sind nicht erlaubt." },
        { tex: "x > 0", correct: false, why: "Fast! Die 0 selbst ist erlaubt: $\\sqrt{0}=0$." },
        { tex: "x \\le 0", correct: false },
      ],
    },
    {
      kind: "pointCheck",
      id: "wz-3",
      prompt: "Liegt der Punkt P auf dem Graphen?",
      termTex: "f(x) = \\sqrt{x}",
      fn: { n: 0.5 },
      point: { x: 9, y: 3 },
      hint: "Rechne $\\sqrt{9}$.",
    },
    {
      kind: "mc",
      id: "wz-4",
      prompt: "Welche Aussagen stimmen für $f(x)=\\sqrt{x}$?",
      multi: true,
      options: [
        { text: "Definitionsbereich D = [0; ∞)", correct: true },
        { text: "Wertebereich W = [0; ∞)", correct: true },
        { text: "Sie ist monoton steigend", correct: true },
        { text: "Sie ist achsensymmetrisch zur y-Achse", correct: false },
        { text: "√(-4) ist definiert", correct: false, why: "Aus negativen Zahlen gibt es keine Wurzel." },
      ],
    },
    {
      kind: "equation",
      id: "wz-5",
      prompt: "Löse die Gleichung.",
      equationTex: "\\sqrt{x} = 3",
      solve: { n: 0.5, rhs: 3 },
      hint: "Quadriere beide Seiten: Was ist $3^2$?",
    },
    {
      kind: "equation",
      id: "wz-6",
      prompt: "Löse die Gleichung – aufgepasst!",
      equationTex: "\\sqrt{x} = -2",
      solve: { n: 0.5, rhs: -2 },
      hint: "Kann eine Wurzel überhaupt negativ sein?",
    },
  ],
  Lernzettel,
};
