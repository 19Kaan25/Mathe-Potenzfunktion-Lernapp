import type { LernModul } from "@/lib/types";
import { InlineMath } from "@/components/MathText";
import { MerkeBox, Section } from "@/components/lernzettel/Boxes";

function Row({
  fn,
  d,
  w,
  sym,
}: {
  fn: string;
  d: string;
  w: string;
  sym: string;
}) {
  return (
    <tr className="border-b border-slate-100">
      <td className="px-2 py-2">
        <InlineMath tex={fn} />
      </td>
      <td className="px-2 py-2">
        <InlineMath tex={d} />
      </td>
      <td className="px-2 py-2">
        <InlineMath tex={w} />
      </td>
      <td className="px-2 py-2 text-xs">{sym}</td>
    </tr>
  );
}

function Lernzettel() {
  return (
    <div>
      <Section title="Vier Fragen an jede Funktion" emoji="🧰">
        <p>
          „Eigenschaften bestimmen" heißt: Du beantwortest vier Fragen. Geh sie
          immer der Reihe nach durch:
        </p>
        <MerkeBox title="Dein Werkzeugkasten">
          <ol className="ml-4 list-decimal space-y-2">
            <li>
              <b>Definitionsbereich D</b> – Welche <InlineMath tex="x" /> darf
              ich einsetzen? <br />
              Wurzel → <InlineMath tex="x\ge 0" />. Minus-Hochzahl (geteilt
              durch) → <InlineMath tex="x\neq 0" />. Sonst → alle Zahlen.
            </li>
            <li>
              <b>Wertebereich W</b> – Welche <InlineMath tex="y" /> kommen
              heraus? <br />
              Gerade Hochzahl oder Wurzel → nie negativ.
            </li>
            <li>
              <b>Symmetrie</b> – Gerade Hochzahl →{" "}
              <b>achsensymmetrisch</b> (<InlineMath tex="f(-x)=f(x)" />).
              Ungerade Hochzahl → <b>punktsymmetrisch</b> (
              <InlineMath tex="f(-x)=-f(x)" />). Wurzel → keine.
            </li>
            <li>
              <b>Monotonie</b> – Steigt der Graph oder fällt er?
            </li>
          </ol>
        </MerkeBox>
      </Section>

      <Section title="Spickzettel: alle Familien auf einen Blick" emoji="📋">
        <div className="overflow-x-auto rounded-xl2 border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-100 text-xs font-extrabold text-slate-500">
                <th className="px-2 py-2">Funktion</th>
                <th className="px-2 py-2">D</th>
                <th className="px-2 py-2">W</th>
                <th className="px-2 py-2">Symmetrie</th>
              </tr>
            </thead>
            <tbody>
              <Row fn="x^2" d="\mathbb{R}" w="[0;\infty)" sym="Achse" />
              <Row fn="x^3" d="\mathbb{R}" w="\mathbb{R}" sym="Punkt" />
              <Row
                fn="x^{-1}"
                d="\mathbb{R}\setminus\{0\}"
                w="\mathbb{R}\setminus\{0\}"
                sym="Punkt"
              />
              <Row
                fn="x^{-2}"
                d="\mathbb{R}\setminus\{0\}"
                w="(0;\infty)"
                sym="Achse"
              />
              <Row fn="\sqrt{x}" d="[0;\infty)" w="[0;\infty)" sym="keine" />
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

export const eigenschaften: LernModul = {
  id: "eigenschaften",
  slug: "eigenschaften",
  title: "Eigenschaften-Werkzeugkasten",
  short: "Eigenschaften",
  subtitle: "D, W, Symmetrie & Monotonie bestimmen",
  emoji: "🧰",
  family: "andere",
  uebungen: [
    {
      kind: "property",
      id: "ei-1",
      prompt: "Bestimme die Eigenschaften der Funktion.",
      termTex: "f(x) = x^3",
      fn: { n: 3 },
      parts: [{ type: "domain" }, { type: "range" }, { type: "symmetry" }],
      hint: "Ungerade Hochzahl: darf man jede Zahl einsetzen? Kommen auch negative y heraus?",
    },
    {
      kind: "property",
      id: "ei-2",
      prompt: "Bestimme die Eigenschaften der Funktion.",
      termTex: "f(x) = x^2",
      fn: { n: 2 },
      parts: [
        { type: "domain" },
        { type: "range" },
        { type: "symmetry" },
        {
          type: "monotonie",
          options: [
            "Links fallend, rechts steigend",
            "Überall steigend",
            "Überall fallend",
          ],
          correct: 0,
        },
      ],
      hint: "Die Schüssel fällt erst und steigt dann.",
    },
    {
      kind: "property",
      id: "ei-3",
      prompt: "Bestimme die Eigenschaften der Funktion.",
      termTex: "f(x) = \\sqrt{x}",
      fn: { n: 0.5 },
      parts: [
        { type: "domain" },
        { type: "range" },
        { type: "symmetry" },
        {
          type: "monotonie",
          options: ["Monoton steigend", "Monoton fallend", "Keine"],
          correct: 0,
        },
      ],
      hint: "Negative x darfst du nicht einsetzen.",
    },
    {
      kind: "property",
      id: "ei-4",
      prompt: "Bestimme die Eigenschaften der Funktion.",
      termTex: "f(x) = x^{-2}",
      fn: { n: -2 },
      parts: [{ type: "domain" }, { type: "range" }, { type: "symmetry" }],
      hint: "Bei $x=0$ ist eine Lücke. Es kommt nie etwas Negatives heraus.",
    },
    {
      kind: "property",
      id: "ei-5",
      prompt: "Bestimme die Eigenschaften der Funktion.",
      termTex: "f(x) = x^{-1}",
      fn: { n: -1 },
      parts: [{ type: "domain" }, { type: "range" }, { type: "symmetry" }],
      hint: "1/x: Lücke bei 0, und der Graph ist punktsymmetrisch.",
    },
  ],
  Lernzettel,
};
