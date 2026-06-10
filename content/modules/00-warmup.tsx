import type { LernModul } from "@/lib/types";
import { InlineMath } from "@/components/MathText";
import { MerkeBox, Section } from "@/components/lernzettel/Boxes";

function Lernzettel() {
  return (
    <div>
      <Section title="Was ist eine Potenz?" emoji="🔢">
        <p>
          Eine Potenz ist eine kurze Schreibweise fürs Malnehmen mit sich
          selbst:
        </p>
        <p className="text-center">
          <InlineMath tex="x^3 = x \cdot x \cdot x" />
        </p>
        <p>
          Die kleine hochgestellte Zahl heißt <b>Exponent</b> (oder Hochzahl)
          und sagt, <i>wie oft</i> die <b>Basis</b> <InlineMath tex="x" /> mit
          sich selbst malgenommen wird.
        </p>
      </Section>

      <Section title="Minus-Zahlen einsetzen" emoji="➖">
        <p>Pass beim Minus auf – die Hochzahl entscheidet:</p>
        <p className="text-center">
          <InlineMath tex="(-2)^2 = (-2)\cdot(-2) = 4" />
        </p>
        <p className="text-center">
          <InlineMath tex="(-2)^3 = (-2)\cdot(-2)\cdot(-2) = -8" />
        </p>
        <MerkeBox>
          <b>Gerade</b> Hochzahl (2, 4, 6 …) → Ergebnis wird{" "}
          <b>positiv</b>. <br />
          <b>Ungerade</b> Hochzahl (3, 5, 7 …) → das Minus{" "}
          <b>bleibt</b>.
        </MerkeBox>
      </Section>

      <Section title="Zwei Spezial-Hochzahlen" emoji="✨">
        <p>
          <b>Negativer Exponent</b> = Kehrwert (1 geteilt durch):
        </p>
        <p className="text-center">
          <InlineMath tex="2^{-2} = \frac{1}{2^2} = \frac{1}{4}" />
        </p>
        <p>
          <b>Bruch ½ als Exponent</b> = Wurzel:
        </p>
        <p className="text-center">
          <InlineMath tex="x^{\frac{1}{2}} = \sqrt{x}" />
        </p>
      </Section>
    </div>
  );
}

export const warmup: LernModul = {
  id: "warmup",
  slug: "grundlagen",
  title: "Grundlagen: Was ist eine Potenz?",
  short: "Grundlagen",
  subtitle: "Basis, Exponent, Minus-Zahlen & Spezialfälle",
  emoji: "🔢",
  family: "andere",
  Lernzettel,
  uebungen: [
    {
      kind: "mc",
      id: "wu-1",
      prompt: "Was ist $2^3$?",
      options: [
        { tex: "8", correct: true, why: "$2\\cdot2\\cdot2 = 8$" },
        { tex: "6", correct: false, why: "Das wäre $2\\cdot3$, nicht $2^3$." },
        { tex: "9", correct: false },
        { tex: "5", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "wu-2",
      prompt: "Was ist $(-2)^2$?",
      options: [
        { tex: "4", correct: true, why: "Gerade Hochzahl → positiv: $(-2)(-2)=4$." },
        { tex: "-4", correct: false, why: "Bei gerader Hochzahl fällt das Minus weg." },
        { tex: "-2", correct: false },
        { tex: "2", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "wu-3",
      prompt: "Was ist $(-2)^3$?",
      options: [
        { tex: "-8", correct: true, why: "Ungerade Hochzahl → Minus bleibt: $-8$." },
        { tex: "8", correct: false, why: "Bei ungerader Hochzahl bleibt das Minus." },
        { tex: "-6", correct: false },
        { tex: "6", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "wu-4",
      prompt: "Was ist $2^{-2}$?",
      options: [
        { tex: "\\tfrac{1}{4}", correct: true, why: "Negativer Exponent = Kehrwert: $\\frac{1}{2^2}=\\frac14$." },
        { tex: "-4", correct: false, why: "Ein Minus im Exponenten macht die Zahl nicht negativ!" },
        { tex: "4", correct: false },
        { tex: "\\tfrac{1}{2}", correct: false },
      ],
    },
  ],
};
