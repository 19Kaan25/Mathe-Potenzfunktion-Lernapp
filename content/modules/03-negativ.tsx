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
      <Section title="Die Hyperbel – zwei getrennte Äste" emoji="🪁">
        <p>
          Bei <b>negativen</b> Hochzahlen –{" "}
          <InlineMath tex="x^{-1}=\frac{1}{x}" /> oder{" "}
          <InlineMath tex="x^{-2}=\frac{1}{x^2}" /> – teilst du durch{" "}
          <InlineMath tex="x" />. Der Graph heißt <b>Hyperbel</b> und besteht aus{" "}
          <b>zwei getrennten Ästen</b> mit einer Lücke bei{" "}
          <InlineMath tex="x=0" />.
        </p>
        <BildBox caption="Orange: 1/x – punktsymmetrisch, Äste oben rechts & unten links">
          <FunctionPlot
            curves={[{ fn: { n: -1 }, stroke: "#ea580c" }]}
            xRange={[-4, 4]}
            yRange={[-4, 4]}
          />
        </BildBox>
        <BildBox caption="Orange: 1/x² – achsensymmetrisch, beide Äste oben">
          <FunctionPlot
            curves={[{ fn: { n: -2 }, stroke: "#ea580c" }]}
            xRange={[-4, 4]}
            yRange={[-1, 5]}
          />
        </BildBox>
      </Section>

      <Section title="Was du dir merken musst" emoji="📌">
        <MerkeBox>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <b>Definitionslücke</b> bei <InlineMath tex="x=0" />:{" "}
              <InlineMath tex="D=\mathbb{R}\setminus\{0\}" /> – durch 0 darf man
              nicht teilen!
            </li>
            <li>
              Je näher <InlineMath tex="x" /> an 0, desto <b>steiler</b> rast die
              Kurve weg (das nennt man <b>Polstelle</b>).
            </li>
            <li>
              Weit draußen schmiegt sich die Kurve an die x-Achse an (kommt ihr
              nah, berührt sie aber nie).
            </li>
            <li>
              <InlineMath tex="\tfrac{1}{x}" /> (ungerade) ist{" "}
              <b>punktsymmetrisch</b>, <InlineMath tex="\tfrac{1}{x^2}" />{" "}
              (gerade) ist <b>achsensymmetrisch</b>.
            </li>
          </ul>
        </MerkeBox>
      </Section>

      <Section title="Achtung, typischer Fehler" emoji="⚠️">
        <StolperstelleBox>
          Ein Minus im Exponenten macht die Zahl <b>nicht</b> negativ! Es
          bedeutet „Kehrwert": <InlineMath tex="2^{-2}=\tfrac{1}{2^2}=\tfrac14" />{" "}
          – also eine ganz normale positive Zahl.
        </StolperstelleBox>
      </Section>
    </div>
  );
}

export const negativ: LernModul = {
  id: "negativ",
  slug: "negative-exponenten",
  title: "Negative Exponenten",
  short: "Negativ",
  subtitle: "x⁻¹, x⁻² – die Hyperbel",
  emoji: "🪁",
  family: "negativ",
  uebungen: [
    {
      kind: "wertetabelle",
      id: "ne-1",
      prompt: "Fülle die Wertetabelle aus. Tipp: x⁻¹ heißt 1 geteilt durch x.",
      termTex: "f(x) = x^{-1} = \\tfrac{1}{x}",
      fn: { n: -1 },
      xs: [-2, -1, -0.5, 0.5, 1, 2],
      hint: "$\\frac{1}{0{,}5}=2$ und $\\frac{1}{-0{,}5}=-2$.",
    },
    {
      kind: "wertetabelle",
      id: "ne-2",
      prompt: "Fülle die Wertetabelle aus.",
      termTex: "f(x) = x^{-2} = \\tfrac{1}{x^2}",
      fn: { n: -2 },
      xs: [-2, -1, -0.5, 0.5, 1, 2],
      hint: "Erst quadrieren, dann 1 geteilt durch. $\\frac{1}{(0{,}5)^2}=\\frac{1}{0{,}25}=4$.",
    },
    {
      kind: "mc",
      id: "ne-3",
      prompt: "Welche Symmetrie hat $f(x)=x^{-2}$?",
      graphFn: { n: -2 },
      options: [
        {
          text: "Achsensymmetrisch zur y-Achse",
          correct: true,
          why: "Gerade Hochzahl → beide Äste liegen gleich hoch.",
        },
        { text: "Punktsymmetrisch zum Ursprung", correct: false },
        { text: "Keine Symmetrie", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "ne-4",
      prompt: "Für welche x ist $f(x)=\\tfrac{1}{x}$ definiert?",
      options: [
        { tex: "x \\neq 0", correct: true, why: "Durch 0 darf man nicht teilen." },
        { tex: "\\text{alle } x", correct: false, why: "Bei $x=0$ gibt es eine Lücke." },
        { tex: "x \\ge 0", correct: false },
        { tex: "x > 0", correct: false },
      ],
    },
    {
      kind: "pointCheck",
      id: "ne-5",
      prompt: "Liegt der Punkt P auf dem Graphen?",
      termTex: "f(x) = x^{-2}",
      fn: { n: -2 },
      point: { x: -2, y: 0.25 },
      hint: "Rechne $(-2)^{-2}=\\frac{1}{(-2)^2}=\\frac{1}{4}$.",
    },
    {
      kind: "equation",
      id: "ne-6",
      prompt: "Löse die Gleichung.",
      equationTex: "x^{-2} = 4",
      solve: { n: -2, rhs: 4 },
      hint: "$\\frac{1}{x^2}=4$ bedeutet $x^2=\\frac{1}{4}$.",
    },
    {
      kind: "graphMatch",
      id: "ne-7",
      prompt: "Ordne jedem Graphen den richtigen Term zu.",
      items: [
        { id: "h1", fn: { n: -1 }, termTex: "x^{-1}" },
        { id: "h2", fn: { n: -2 }, termTex: "x^{-2}" },
      ],
      hint: "Punktsymmetrisch (zwei Ecken) = 1/x. Beide Äste oben = 1/x².",
    },
  ],
  Lernzettel,
};
