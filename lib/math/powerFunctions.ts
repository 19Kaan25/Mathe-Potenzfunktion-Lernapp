import type { Family, PowerFn } from "@/lib/types";

const EPS = 1e-9;

export function isInteger(n: number): boolean {
  return Math.abs(n - Math.round(n)) < EPS;
}

export function isEven(n: number): boolean {
  return isInteger(n) && Math.round(n) % 2 === 0;
}

/**
 * Sicheres Potenzieren base^n unter Berücksichtigung des Definitionsbereichs.
 * Gibt NaN zurück, wo die Funktion nicht definiert ist
 * (negativer Radikand bei Wurzeln, Polstelle bei negativen Exponenten).
 */
export function powSafe(base: number, n: number): number {
  if (isInteger(n)) {
    const ni = Math.round(n);
    if (ni < 0 && Math.abs(base) < EPS) return NaN; // Polstelle
    return Math.pow(base, ni);
  }
  // gebrochener Exponent (Wurzel): nur für base >= 0 definiert
  if (base < 0) return NaN;
  return Math.pow(base, n);
}

export function evalFn(fn: PowerFn, x: number): number {
  const a = fn.a ?? 1;
  const c = fn.c ?? 0;
  const d = fn.d ?? 0;
  return a * powSafe(x - c, n_(fn)) + d;
}

function n_(fn: PowerFn): number {
  return fn.n;
}

export function isDefined(fn: PowerFn, x: number): boolean {
  return Number.isFinite(evalFn(fn, x));
}

/* ------------------------------------------------------------------ */
/* Klassifizierung & Eigenschaften                                    */
/* ------------------------------------------------------------------ */

export function classifyFamily(fn: PowerFn): Family {
  const n = fn.n;
  if (!isInteger(n)) {
    if (n > 0 && n < 1) return "wurzel";
    return "andere";
  }
  const ni = Math.round(n);
  if (ni === 1) return "linear";
  if (ni < 0) return "negativ";
  if (ni > 0) return (ni % 2 === 0 ? "gerade" : "ungerade");
  return "andere";
}

/**
 * Numerischer Symmetrie-Test auf dem Definitionsbereich.
 * "achse" = achsensymmetrisch zur y-Achse (f(−x)=f(x))
 * "punkt" = punktsymmetrisch zum Ursprung (f(−x)=−f(x))
 */
export function numericSymmetry(fn: PowerFn): "achse" | "punkt" | "keine" {
  const samples = [0.3, 0.7, 1, 1.5, 2.2, 3.1];
  let axis = true;
  let point = true;
  let tested = 0;
  for (const x of samples) {
    const fp = evalFn(fn, x);
    const fm = evalFn(fn, -x);
    if (!Number.isFinite(fp) || !Number.isFinite(fm)) {
      // wenn nur eine Seite definiert ist (z.B. Wurzel) → keine Symmetrie
      if (Number.isFinite(fp) !== Number.isFinite(fm)) {
        axis = false;
        point = false;
      }
      continue;
    }
    tested++;
    if (Math.abs(fp - fm) > 1e-6) axis = false;
    if (Math.abs(fp + fm) > 1e-6) point = false;
  }
  if (tested === 0) return "keine";
  if (axis) return "achse";
  if (point) return "punkt";
  return "keine";
}

export interface FnProperties {
  family: Family;
  /** TeX-Strings für die Anzeige */
  domainTex: string;
  rangeTex: string;
  symmetry: "achse" | "punkt" | "keine";
  symmetryLabel: string;
}

/**
 * Eigenschaften für reine Potenz-/Wurzelfunktionen f(x)=a·x^n (c=0).
 * Verschiebung d wird im Wertebereich berücksichtigt.
 */
export function properties(fn: PowerFn): FnProperties {
  const family = classifyFamily(fn);
  const a = fn.a ?? 1;
  const d = fn.d ?? 0;
  const sym = numericSymmetry(fn);

  let domainTex = "\\mathbb{R}";
  let rangeTex = "\\mathbb{R}";

  const dStr = d === 0 ? "" : d > 0 ? `+${fmtPlain(d)}` : `${fmtPlain(d)}`;
  const lower = `${fmtPlain(d)}`;

  if (family === "gerade") {
    domainTex = "\\mathbb{R}";
    rangeTex = a > 0 ? `[${lower};\\,\\infty)` : `(-\\infty;\\,${lower}]`;
  } else if (family === "ungerade" || family === "linear") {
    domainTex = "\\mathbb{R}";
    rangeTex = "\\mathbb{R}";
  } else if (family === "negativ") {
    domainTex = "\\mathbb{R}\\setminus\\{0\\}";
    if (isEven(fn.n)) {
      rangeTex = a > 0 ? `(${lower};\\,\\infty)` : `(-\\infty;\\,${lower})`;
    } else {
      rangeTex = `\\mathbb{R}\\setminus\\{${lower}\\}`;
    }
  } else if (family === "wurzel") {
    domainTex = "[0;\\,\\infty)";
    rangeTex = a > 0 ? `[${lower};\\,\\infty)` : `(-\\infty;\\,${lower}]`;
  }

  const symmetryLabel =
    sym === "achse"
      ? "achsensymmetrisch zur y-Achse"
      : sym === "punkt"
        ? "punktsymmetrisch zum Ursprung"
        : "keine Symmetrie";

  return { family, domainTex, rangeTex, symmetry: sym, symmetryLabel };
}

/* ------------------------------------------------------------------ */
/* Zahl-Formatierung (deutsche Schreibweise)                          */
/* ------------------------------------------------------------------ */

export function roundTo(x: number, dp = 4): number {
  const f = Math.pow(10, dp);
  return Math.round(x * f) / f;
}

/** Plain (Punkt als Dezimaltrenner) – für TeX */
export function fmtPlain(x: number, dp = 4): string {
  if (!Number.isFinite(x)) return "n.\\,def.";
  const r = roundTo(x, dp);
  if (Math.abs(r - Math.round(r)) < 1e-9) return String(Math.round(r));
  return String(r);
}

/** Deutsche Schreibweise mit Komma – für Tabellen/Text */
export function fmtG(x: number, dp = 4): string {
  if (!Number.isFinite(x)) return "n. def.";
  return fmtPlain(x, dp).replace(".", ",");
}

/** Nutzereingabe parsen: akzeptiert Komma oder Punkt */
export function parseNum(s: string): number | null {
  const t = s.trim().replace(",", ".");
  if (t === "") return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : null;
}
