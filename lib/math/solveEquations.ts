import { fmtPlain, isInteger } from "@/lib/math/powerFunctions";

export interface EquationSpec {
  a?: number; // Vorfaktor (Standard 1)
  n: number; // Exponent
  b?: number; // additiver Term (Standard 0)
  rhs: number; // rechte Seite
}

export interface Solution {
  count: 0 | 1 | 2;
  solutions: number[];
  steps: string[]; // TeX-Zeilen für den Lösungsweg
  setTex: string; // L = { ... }
  reason?: string; // Erklärung, v.a. bei "keine Lösung"
}

function rootPos(value: number, p: number): number {
  return Math.pow(value, 1 / p);
}

function setTex(sols: number[]): string {
  if (sols.length === 0) return "L = \\{\\,\\}";
  const inner = sols
    .slice()
    .sort((x, y) => x - y)
    .map((s) => fmtPlain(s))
    .join(";\\; ");
  return `L = \\{${inner}\\}`;
}

/**
 * Löst Gleichungen der Form  a·x^n + b = rhs  über den reellen Zahlen
 * inkl. der typischen Sonderfälle (keine Lösung, ± bei gerader Hochzahl).
 */
export function solveEquation(spec: EquationSpec): Solution {
  const a = spec.a ?? 1;
  const b = spec.b ?? 0;
  const { n, rhs } = spec;
  const steps: string[] = [];

  const lhs =
    (a === 1 ? "" : a === -1 ? "-" : `${fmtPlain(a)}\\,`) +
    `x^{${fmtPlain(n)}}` +
    (b === 0 ? "" : b > 0 ? ` + ${fmtPlain(b)}` : ` - ${fmtPlain(-b)}`);
  steps.push(`${lhs} = ${fmtPlain(rhs)}`);

  if (b !== 0) {
    steps.push(
      `${a === 1 ? "" : a === -1 ? "-" : `${fmtPlain(a)}\\,`}x^{${fmtPlain(n)}} = ${fmtPlain(rhs - b)}`,
    );
  }
  const k = (rhs - b) / a;
  if (a !== 1) {
    steps.push(`x^{${fmtPlain(n)}} = ${fmtPlain(k)}`);
  }

  const fail = (reason: string): Solution => {
    steps.push("\\Rightarrow\\ \\text{keine Lösung}");
    return { count: 0, solutions: [], steps, setTex: "L = \\{\\,\\}", reason };
  };

  // ---- gebrochener Exponent: Wurzelfunktion x^(1/m) = k ----
  if (!isInteger(n)) {
    if (n <= 0 || n >= 1) {
      return fail("Diesen Exponenten kann die App noch nicht lösen.");
    }
    if (k < -1e-9) {
      return fail(
        "Eine Wurzel ist nie negativ – darum gibt es keine Lösung.",
      );
    }
    const x = rootPos(Math.max(k, 0), n); // x^(1/m)=k → x = k^(1/n) = k^m
    steps.push(`x = ${fmtPlain(k)}^{${fmtPlain(1 / n)}} = ${fmtPlain(x)}`);
    return { count: 1, solutions: [x], steps, setTex: setTex([x]) };
  }

  const ni = Math.round(n);

  // ---- positiver ganzzahliger Exponent ----
  if (ni > 0) {
    if (ni % 2 === 0) {
      if (k > 1e-9) {
        const r = rootPos(k, ni);
        steps.push(
          `x = \\pm\\sqrt[${ni}]{${fmtPlain(k)}} = \\pm ${fmtPlain(r)}`,
        );
        return { count: 2, solutions: [-r, r], steps, setTex: setTex([-r, r]) };
      }
      if (Math.abs(k) <= 1e-9) {
        steps.push("x = 0");
        return { count: 1, solutions: [0], steps, setTex: setTex([0]) };
      }
      return fail(
        "Eine gerade Hochzahl macht jedes Ergebnis ≥ 0 – eine negative Zahl ist unmöglich.",
      );
    }
    // ungerade
    const r = Math.sign(k) * rootPos(Math.abs(k), ni);
    steps.push(`x = \\sqrt[${ni}]{${fmtPlain(k)}} = ${fmtPlain(r)}`);
    return { count: 1, solutions: [r], steps, setTex: setTex([r]) };
  }

  // ---- negativer ganzzahliger Exponent: x^(−m) = k ----
  const m = -ni;
  if (Math.abs(k) <= 1e-9) {
    return fail("x mit negativer Hochzahl kann nie 0 ergeben.");
  }
  const inv = 1 / k; // x^m = 1/k
  steps.push(`x^{${m}} = \\frac{1}{${fmtPlain(k)}} = ${fmtPlain(inv)}`);
  if (m % 2 === 0) {
    if (inv > 1e-9) {
      const r = rootPos(inv, m);
      steps.push(`x = \\pm\\sqrt[${m}]{${fmtPlain(inv)}} = \\pm ${fmtPlain(r)}`);
      return { count: 2, solutions: [-r, r], steps, setTex: setTex([-r, r]) };
    }
    return fail(
      "Eine gerade Hochzahl macht jedes Ergebnis ≥ 0 – darum keine Lösung.",
    );
  }
  const r = Math.sign(inv) * rootPos(Math.abs(inv), m);
  steps.push(`x = \\sqrt[${m}]{${fmtPlain(inv)}} = ${fmtPlain(r)}`);
  return { count: 1, solutions: [r], steps, setTex: setTex([r]) };
}
