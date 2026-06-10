import type { Family } from "@/lib/types";

/**
 * Durchgängige Farbcodierung je Funktionsfamilie.
 * Wichtig: Klassennamen müssen als vollständige Literale dastehen,
 * damit Tailwind sie beim Purgen nicht entfernt.
 */
export interface FamilyTheme {
  label: string;
  stroke: string; // Hex für den Graphen (SVG)
  soft: string; // helle Fläche, z.B. Karten-Hintergrund
  text: string; // farbiger Text
  border: string;
  chip: string; // Badge/Chip
  ring: string; // Fokus-/Akzentring
  button: string; // Aktionsbutton in Familienfarbe
  dot: string; // kleiner Punkt
}

export const familyTheme: Record<Family, FamilyTheme> = {
  gerade: {
    label: "Gerade Exponenten",
    stroke: "#0284c7",
    soft: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    chip: "bg-sky-100 text-sky-700",
    ring: "ring-sky-300",
    button: "bg-sky-600 hover:bg-sky-700 text-white",
    dot: "bg-sky-500",
  },
  ungerade: {
    label: "Ungerade Exponenten",
    stroke: "#059669",
    soft: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    chip: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-300",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    dot: "bg-emerald-500",
  },
  negativ: {
    label: "Negative Exponenten",
    stroke: "#ea580c",
    soft: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    chip: "bg-orange-100 text-orange-700",
    ring: "ring-orange-300",
    button: "bg-orange-600 hover:bg-orange-700 text-white",
    dot: "bg-orange-500",
  },
  wurzel: {
    label: "Wurzelfunktionen",
    stroke: "#7c3aed",
    soft: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    chip: "bg-violet-100 text-violet-700",
    ring: "ring-violet-300",
    button: "bg-violet-600 hover:bg-violet-700 text-white",
    dot: "bg-violet-500",
  },
  linear: {
    label: "Lineare Funktion",
    stroke: "#64748b",
    soft: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    chip: "bg-slate-100 text-slate-700",
    ring: "ring-slate-300",
    button: "bg-slate-600 hover:bg-slate-700 text-white",
    dot: "bg-slate-500",
  },
  andere: {
    label: "Funktion",
    stroke: "#475569",
    soft: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    chip: "bg-slate-100 text-slate-700",
    ring: "ring-slate-300",
    button: "bg-slate-700 hover:bg-slate-800 text-white",
    dot: "bg-slate-500",
  },
};
