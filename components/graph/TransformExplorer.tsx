"use client";

import { useState } from "react";
import { fmtPlain } from "@/lib/math/powerFunctions";
import { FunctionPlot } from "@/components/graph/FunctionPlot";
import { BlockMath } from "@/components/MathText";

function tex(x: number): string {
  return fmtPlain(x).replace(".", "{,}");
}

function buildTerm(k: number, c: number, d: number): string {
  const kPart = k === 1 ? "" : k === -1 ? "-" : `${tex(k)}\\,`;
  const base =
    c === 0
      ? "x"
      : `(x ${c > 0 ? "-" : "+"} ${tex(Math.abs(c))})`;
  const power = `${base}^{2}`;
  const body = k === 0 ? "0" : `${kPart}${power}`;
  const dPart = d === 0 ? "" : d > 0 ? ` + ${tex(d)}` : ` - ${tex(-d)}`;
  return `f(x) = ${body}${dPart}`;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-extrabold text-ink">
          {label} = <span className="text-violet-600">{tex(value).replace("{,}", ",")}</span>
        </span>
        <span className="text-xs text-slate-400">{hint}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-violet-600"
      />
    </div>
  );
}

export function TransformExplorer() {
  const [k, setK] = useState(1);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);

  return (
    <div className="space-y-3 rounded-xl2 border border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-bold text-violet-800">
        🎚️ Schieb an den Reglern und beobachte, was passiert!
      </p>

      <div className="rounded-xl2 border border-slate-200 bg-white p-2">
        <FunctionPlot
          curves={[
            { fn: { n: 2 }, stroke: "#cbd5e1", dashed: true, width: 2 },
            { fn: { a: k, n: 2, c, d }, stroke: "#7c3aed" },
          ]}
          xRange={[-5, 5]}
          yRange={[-4, 8]}
          unit={28}
          showDiagonal={false}
        />
        <p className="text-center text-xs text-slate-400">
          grau gestrichelt: die Ausgangsfunktion <em>x²</em>
        </p>
      </div>

      <div className="rounded-xl bg-white px-3 py-1">
        <BlockMath tex={buildTerm(k, c, d)} />
      </div>

      <div className="space-y-3">
        <Slider
          label="k"
          value={k}
          min={-3}
          max={3}
          step={0.5}
          onChange={setK}
          hint="strecken & spiegeln"
        />
        <Slider
          label="c"
          value={c}
          min={-3}
          max={3}
          step={0.5}
          onChange={setC}
          hint="links / rechts"
        />
        <Slider
          label="d"
          value={d}
          min={-3}
          max={3}
          step={0.5}
          onChange={setD}
          hint="hoch / runter"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          setK(1);
          setC(0);
          setD(0);
        }}
        className="w-full rounded-xl border border-violet-200 bg-white py-2 text-sm font-bold text-violet-600"
      >
        Zurücksetzen
      </button>
    </div>
  );
}
