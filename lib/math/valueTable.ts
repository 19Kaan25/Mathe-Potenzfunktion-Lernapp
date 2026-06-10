import type { PowerFn } from "@/lib/types";
import { evalFn, roundTo } from "@/lib/math/powerFunctions";

export interface TablePoint {
  x: number;
  y: number; // NaN, wenn nicht definiert
  defined: boolean;
}

export function valueTable(fn: PowerFn, xs: number[], dp = 4): TablePoint[] {
  return xs.map((x) => {
    const raw = evalFn(fn, x);
    const defined = Number.isFinite(raw);
    return { x, y: defined ? roundTo(raw, dp) : NaN, defined };
  });
}

/**
 * Punkte zum Zeichnen einer Funktion in [xMin, xMax].
 * Liefert mehrere Segmente, damit Polstellen (Definitionslücken)
 * die Kurve unterbrechen statt sie durchzuziehen.
 */
export function plotSegments(
  fn: PowerFn,
  xMin: number,
  xMax: number,
  steps = 240,
): { x: number; y: number }[][] {
  const segments: { x: number; y: number }[][] = [];
  let current: { x: number; y: number }[] = [];
  const dx = (xMax - xMin) / steps;
  let prevY: number | null = null;

  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const y = evalFn(fn, x);
    if (!Number.isFinite(y) || Math.abs(y) > 1e6) {
      if (current.length > 1) segments.push(current);
      current = [];
      prevY = null;
      continue;
    }
    // großer Sprung (Polstelle): Segment trennen
    if (prevY !== null && Math.abs(y - prevY) > 50) {
      if (current.length > 1) segments.push(current);
      current = [];
    }
    current.push({ x, y });
    prevY = y;
  }
  if (current.length > 1) segments.push(current);
  return segments;
}
