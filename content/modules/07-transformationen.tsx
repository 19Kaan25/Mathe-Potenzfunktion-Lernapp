import type { LernModul } from "@/lib/types";
import { InlineMath } from "@/components/MathText";
import { TransformExplorer } from "@/components/graph/TransformExplorer";
import { MerkeBox, Section, StolperstelleBox } from "@/components/lernzettel/Boxes";

function Lernzettel() {
  return (
    <div>
      <Section title="Eine Funktion, drei Stellschrauben" emoji="🎚️">
        <p>
          Aus einer einfachen Potenzfunktion kann man neue Graphen bauen. Die
          allgemeine Form ist:
        </p>
        <p className="text-center text-lg">
          <InlineMath tex="f(x) = k\cdot (x-c)^n + d" />
        </p>
        <p>
          Die drei Zahlen <InlineMath tex="k" />, <InlineMath tex="c" /> und{" "}
          <InlineMath tex="d" /> verschieben, strecken oder spiegeln den
          Graphen. Probier es selbst aus:
        </p>
        <TransformExplorer />
      </Section>

      <Section title="Was jede Zahl macht" emoji="📌">
        <MerkeBox>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <b>
                <InlineMath tex="d" /> verschiebt nach oben/unten
              </b>{" "}
              – <InlineMath tex="d>0" /> hoch, <InlineMath tex="d<0" /> runter.
            </li>
            <li>
              <b>
                <InlineMath tex="c" /> verschiebt nach links/rechts
              </b>{" "}
              – <InlineMath tex="(x-c)" /> heißt: nach <b>rechts</b> um{" "}
              <InlineMath tex="c" />.
            </li>
            <li>
              <b>
                <InlineMath tex="k" /> streckt/staucht
              </b>{" "}
              – <InlineMath tex="|k|>1" /> schmaler, <InlineMath tex="|k|<1" />{" "}
              breiter. <InlineMath tex="k<0" /> <b>spiegelt</b> (öffnet nach
              unten).
            </li>
          </ul>
        </MerkeBox>
      </Section>

      <Section title="Achtung, typischer Fehler" emoji="⚠️">
        <StolperstelleBox>
          Beim Verschieben in x-Richtung ist das Vorzeichen „verdreht":{" "}
          <InlineMath tex="(x-2)^2" /> geht nach <b>rechts</b>,{" "}
          <InlineMath tex="(x+2)^2" /> nach <b>links</b> – obwohl da ein Plus
          steht!
        </StolperstelleBox>
      </Section>
    </div>
  );
}

export const transformationen: LernModul = {
  id: "transformationen",
  slug: "transformationen",
  title: "Verschieben & Strecken",
  short: "Transformation",
  subtitle: "k·(x−c)ⁿ+d verstehen",
  emoji: "🎚️",
  family: "andere",
  uebungen: [
    {
      kind: "mc",
      id: "tr-1",
      prompt: "Was bewirkt die $-3$ in $f(x)=x^2-3$?",
      options: [
        { text: "Verschiebung um 3 nach unten", correct: true, why: "Eine Zahl ganz am Ende ($d$) verschiebt nach oben/unten." },
        { text: "Verschiebung um 3 nach links", correct: false },
        { text: "Streckung um den Faktor 3", correct: false },
        { text: "Spiegelung an der x-Achse", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "tr-2",
      prompt: "Wie entsteht der Graph von $f(x)=(x+2)^2$ aus $x^2$?",
      options: [
        { text: "Verschiebung um 2 nach links", correct: true, why: "$(x+2)$ verschiebt nach links – das Vorzeichen ist „verdreht“." },
        { text: "Verschiebung um 2 nach rechts", correct: false, why: "Das wäre $(x-2)^2$." },
        { text: "Verschiebung um 2 nach oben", correct: false },
        { text: "Streckung um 2", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "tr-3",
      prompt: "Welcher Term gehört zum gezeigten Graphen? Begründe.",
      graphFn: { n: 2, c: 2 },
      options: [
        { tex: "(x-2)^2", correct: true, why: "Der tiefste Punkt liegt bei $x=2$ → nach rechts verschoben." },
        { tex: "(x+2)^2", correct: false, why: "Das läge bei $x=-2$." },
        { tex: "x^2 - 2", correct: false, why: "Das wäre nach unten verschoben." },
        { tex: "x^2 + 2", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "tr-4",
      prompt: "Welcher Term gehört zum gezeigten Graphen? Begründe.",
      graphFn: { a: -2, n: 2 },
      options: [
        { tex: "-2x^2", correct: true, why: "Nach unten geöffnet (Minus) und schmaler (Faktor 2)." },
        { tex: "2x^2", correct: false, why: "Das wäre nach oben geöffnet." },
        { tex: "-x^2", correct: false, why: "Richtige Richtung, aber nicht schmal genug." },
        { tex: "x^2", correct: false },
      ],
    },
    {
      kind: "graphMatch",
      id: "tr-5",
      prompt: "Ordne jedem Graphen den richtigen Term zu.",
      items: [
        { id: "t1", fn: { n: 2 }, termTex: "x^2" },
        { id: "t2", fn: { n: 2, c: 2 }, termTex: "(x-2)^2" },
        { id: "t3", fn: { n: 2, d: -3 }, termTex: "x^2-3" },
        { id: "t4", fn: { a: -1, n: 2 }, termTex: "-x^2" },
      ],
      hint: "Achte auf den tiefsten/höchsten Punkt und die Öffnungsrichtung.",
    },
    {
      kind: "mc",
      id: "tr-6",
      prompt: "Welche Zahl sorgt dafür, dass ein Graph nach unten geöffnet ist?",
      options: [
        { text: "Ein negatives k (z. B. k = -1)", correct: true, why: "$k<0$ spiegelt den Graphen nach unten." },
        { text: "Ein negatives d", correct: false, why: "$d$ verschiebt nur nach unten, dreht aber nicht um." },
        { text: "Ein negatives c", correct: false },
      ],
    },
  ],
  Lernzettel,
};
