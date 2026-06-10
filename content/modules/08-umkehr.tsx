import type { LernModul } from "@/lib/types";
import { BlockMath, InlineMath } from "@/components/MathText";
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
      <Section title="Rückwärts denken" emoji="🔄">
        <p>
          Die <b>Umkehrfunktion</b> <InlineMath tex="f^{-1}" /> macht das, was{" "}
          <InlineMath tex="f" /> tut, wieder <b>rückgängig</b>. Beispiel:{" "}
          <InlineMath tex="x^2" /> quadriert – die Umkehrung{" "}
          <InlineMath tex="\sqrt{x}" /> zieht die Wurzel.
        </p>
        <BildBox caption="Blau x², lila √x – gespiegelt an der gestrichelten Linie y = x">
          <FunctionPlot
            curves={[
              { fn: { n: 2 }, stroke: "#0284c7" },
              { fn: { n: 0.5 }, stroke: "#7c3aed" },
            ]}
            xRange={[-1, 5]}
            yRange={[-1, 5]}
            unit={30}
            showDiagonal
          />
        </BildBox>
        <p>
          Den Graphen der Umkehrfunktion bekommst du, indem du den
          ursprünglichen Graphen an der <b>1. Winkelhalbierenden</b>{" "}
          <InlineMath tex="y=x" /> spiegelst.
        </p>
      </Section>

      <Section title="So rechnest du sie aus" emoji="🧭">
        <MerkeBox title="3 Schritte">
          <ol className="ml-4 list-decimal space-y-1">
            <li>
              Schreibe <InlineMath tex="y = f(x)" />.
            </li>
            <li>
              <b>
                Vertausche <InlineMath tex="x" /> und <InlineMath tex="y" />.
              </b>
            </li>
            <li>
              Löse nach <InlineMath tex="y" /> auf.
            </li>
          </ol>
          <div className="mt-2 rounded-lg bg-white p-2">
            <BlockMath tex="y = x^3 \;\Rightarrow\; x = y^3 \;\Rightarrow\; y = \sqrt[3]{x}" />
          </div>
        </MerkeBox>
      </Section>

      <Section title="Zwei wichtige Stolperstellen" emoji="⚠️">
        <StolperstelleBox title="f⁻¹ ist KEIN Kehrwert">
          <InlineMath tex="f^{-1}" /> bedeutet „Umkehrfunktion", <b>nicht</b>{" "}
          <InlineMath tex="\tfrac{1}{f(x)}" />. Die kleine{" "}
          <InlineMath tex="-1" /> ist hier keine Hochzahl!
        </StolperstelleBox>
        <StolperstelleBox title="Bei x² den Bereich einschränken">
          Zu <InlineMath tex="y=4" /> gehören bei <InlineMath tex="x^2" />{" "}
          <b>zwei</b> x-Werte (<InlineMath tex="2" /> und{" "}
          <InlineMath tex="-2" />). Damit die Umkehrung eine echte Funktion
          wird, erlaubt man nur <InlineMath tex="x\ge 0" />.
        </StolperstelleBox>
      </Section>
    </div>
  );
}

export const umkehr: LernModul = {
  id: "umkehr",
  slug: "umkehrfunktionen",
  title: "Umkehrfunktionen",
  short: "Umkehrung",
  subtitle: "Tauschen, auflösen, spiegeln",
  emoji: "🔄",
  family: "andere",
  uebungen: [
    {
      kind: "mc",
      id: "um-1",
      prompt: "Wie lautet die Umkehrfunktion von $f(x)=x^3$?",
      options: [
        { tex: "f^{-1}(x)=\\sqrt[3]{x}", correct: true, why: "Die 3. Wurzel macht das Hoch-3 rückgängig." },
        { tex: "f^{-1}(x)=\\tfrac{1}{x^3}", correct: false, why: "Das ist der Kehrwert, nicht die Umkehrfunktion!" },
        { tex: "f^{-1}(x)=x^3", correct: false },
        { tex: "f^{-1}(x)=3x", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "um-2",
      prompt: "Die Umkehrfunktion von $f(x)=x^2$ (für $x\\ge 0$) ist …?",
      options: [
        { tex: "\\sqrt{x}", correct: true, why: "Wurzelziehen macht das Quadrieren rückgängig." },
        { tex: "x^2", correct: false },
        { tex: "\\tfrac{1}{x^2}", correct: false, why: "Das ist der Kehrwert." },
        { tex: "2x", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "um-3",
      prompt: "Wodurch entsteht der Graph der Umkehrfunktion?",
      options: [
        { text: "Spiegelung an der Linie y = x", correct: true, why: "An der 1. Winkelhalbierenden gespiegelt." },
        { text: "Spiegelung an der y-Achse", correct: false },
        { text: "Spiegelung an der x-Achse", correct: false },
        { text: "Verschiebung nach oben", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "um-4",
      prompt: "Was bedeutet die Schreibweise $f^{-1}$?",
      options: [
        { text: "Die Umkehrfunktion von f", correct: true, why: "Die −1 ist hier keine Hochzahl." },
        { text: "Der Kehrwert 1 geteilt durch f(x)", correct: false, why: "Häufige Falle – das ist es NICHT." },
      ],
    },
    {
      kind: "mc",
      id: "um-5",
      prompt: "Warum schränkt man bei $f(x)=x^2$ den Definitionsbereich auf $x\\ge 0$ ein?",
      options: [
        { text: "Sonst gehören zu einem y zwei x-Werte (z. B. y=4 → 2 und −2)", correct: true, why: "Dann wäre die Umkehrung keine eindeutige Funktion." },
        { text: "Weil x² für negative x nicht definiert ist", correct: false, why: "x² ist für alle x definiert." },
        { text: "Damit die Kurve schöner aussieht", correct: false },
      ],
    },
    {
      kind: "mc",
      id: "um-6",
      prompt: "Welcher Schritt kommt beim Bestimmen der Umkehrfunktion zuerst?",
      options: [
        { text: "x und y vertauschen, dann nach y auflösen", correct: true, why: "Erst tauschen, dann auflösen." },
        { text: "Sofort die Wurzel ziehen", correct: false },
        { text: "Den Kehrwert bilden", correct: false },
      ],
    },
  ],
  Lernzettel,
};
