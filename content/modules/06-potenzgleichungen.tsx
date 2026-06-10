import type { LernModul } from "@/lib/types";
import { BlockMath, InlineMath } from "@/components/MathText";
import { MerkeBox, Section, StolperstelleBox } from "@/components/lernzettel/Boxes";

function Lernzettel() {
  return (
    <div>
      <Section title="So löst du eine Potenzgleichung" emoji="🧮">
        <p>
          Eine Potenzgleichung wie <InlineMath tex="2x^4 - 10 = 22" /> löst du
          immer in der gleichen Reihenfolge:
        </p>
        <MerkeBox title="3 Schritte">
          <ol className="ml-4 list-decimal space-y-1">
            <li>
              <b>
                <InlineMath tex="x^n" /> alleine stellen
              </b>{" "}
              – alles andere auf die andere Seite bringen und durch den Vorfaktor
              teilen.
            </li>
            <li>
              <b>Wurzel ziehen</b> – die passende Wurzel auf beiden Seiten.
            </li>
            <li>
              <b>
                Bei gerader Hochzahl: <InlineMath tex="\pm" /> nicht vergessen!
              </b>
            </li>
          </ol>
        </MerkeBox>
        <div className="rounded-xl2 border border-slate-200 bg-white p-3">
          <BlockMath tex="2x^4 - 10 = 22" />
          <BlockMath tex="2x^4 = 32" />
          <BlockMath tex="x^4 = 16" />
          <BlockMath tex="x = \pm\sqrt[4]{16} = \pm 2" />
        </div>
      </Section>

      <Section title="Wie viele Lösungen gibt es?" emoji="🔢">
        <MerkeBox>
          <p className="mb-2">
            <b>Ungerade Hochzahl</b> (<InlineMath tex="x^3, x^5" />
            …): immer <b>genau eine</b> Lösung – auch negative sind erlaubt.
          </p>
          <p className="mb-1">
            <b>Gerade Hochzahl</b> (<InlineMath tex="x^2, x^4" />
            …): kommt drauf an, was rechts steht:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              rechts <b>positiv</b> → <b>zwei</b> Lösungen (
              <InlineMath tex="+" /> und <InlineMath tex="-" />)
            </li>
            <li>
              rechts <b>0</b> → <b>eine</b> Lösung (<InlineMath tex="x=0" />)
            </li>
            <li>
              rechts <b>negativ</b> → <b>keine</b> Lösung
            </li>
          </ul>
        </MerkeBox>
      </Section>

      <Section title="Achtung, typischer Fehler" emoji="⚠️">
        <StolperstelleBox>
          <InlineMath tex="x^4 = -16" /> hat <b>keine</b> Lösung! Eine gerade
          Hochzahl liefert nie etwas Negatives. Und bei{" "}
          <InlineMath tex="x^2 = 9" /> sind es <b>zwei</b> Lösungen (
          <InlineMath tex="+3" /> und <InlineMath tex="-3" />) – das{" "}
          <InlineMath tex="-" /> wird oft vergessen.
        </StolperstelleBox>
      </Section>
    </div>
  );
}

export const potenzgleichungen: LernModul = {
  id: "potenzgleichungen",
  slug: "potenzgleichungen",
  title: "Potenzgleichungen lösen",
  short: "Gleichungen",
  subtitle: "Lösungsmengen & Sonderfälle",
  emoji: "🧮",
  family: "andere",
  uebungen: [
    {
      kind: "equation",
      id: "pg-1",
      prompt: "Löse die Gleichung.",
      equationTex: "x^3 = 8",
      solve: { n: 3, rhs: 8 },
      hint: "Ungerade Hochzahl → genau eine Lösung. $2^3=8$.",
    },
    {
      kind: "equation",
      id: "pg-2",
      prompt: "Löse die Gleichung. Vergiss das $\\pm$ nicht!",
      equationTex: "x^2 = 16",
      solve: { n: 2, rhs: 16 },
      hint: "Gerade Hochzahl, rechts positiv → zwei Lösungen.",
    },
    {
      kind: "equation",
      id: "pg-3",
      prompt: "Löse die Gleichung.",
      equationTex: "x^5 = -32",
      solve: { n: 5, rhs: -32 },
      hint: "Ungerade Hochzahl → eine (auch negative) Lösung. $(-2)^5=-32$.",
    },
    {
      kind: "equation",
      id: "pg-4",
      prompt: "Löse die Gleichung. Stelle zuerst $x^4$ alleine.",
      equationTex: "2x^4 = 32",
      solve: { a: 2, n: 4, rhs: 32 },
      hint: "Teile zuerst durch 2: $x^4 = 16$.",
    },
    {
      kind: "equation",
      id: "pg-5",
      prompt: "Löse die Gleichung – aufgepasst!",
      equationTex: "x^2 = -9",
      solve: { n: 2, rhs: -9 },
      hint: "Kann $x^2$ negativ werden?",
    },
    {
      kind: "equation",
      id: "pg-6",
      prompt: "Löse die Gleichung. Bring zuerst alles auf eine Seite.",
      equationTex: "3x^3 - 24 = 0",
      solve: { a: 3, n: 3, b: -24, rhs: 0 },
      hint: "$3x^3 = 24$, dann $x^3 = 8$.",
    },
    {
      kind: "mc",
      id: "pg-7",
      prompt: "Wie viele Lösungen hat $x^4 = 10$?",
      options: [
        { text: "Zwei Lösungen", correct: true, why: "Gerade Hochzahl, rechts positiv → $+$ und $-$." },
        { text: "Eine Lösung", correct: false },
        { text: "Keine Lösung", correct: false },
      ],
    },
  ],
  Lernzettel,
};
