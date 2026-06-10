import type { Family, LernModul } from "@/lib/types";
import { warmup } from "@/content/modules/00-warmup";
import { gerade } from "@/content/modules/01-gerade";
import { ungerade } from "@/content/modules/02-ungerade";
import { wurzel } from "@/content/modules/04-wurzel";

export interface PathNode {
  slug: string;
  title: string;
  short: string;
  subtitle: string;
  emoji: string;
  family: Family;
  status: "ready" | "soon";
}

const readyModules: LernModul[] = [warmup, gerade, ungerade, wurzel];

export const modulesBySlug: Record<string, LernModul> = Object.fromEntries(
  readyModules.map((m) => [m.slug, m]),
);

/** Kompletter Lernpfad – auch die noch kommenden Module sind sichtbar. */
export const learnPath: PathNode[] = [
  node(warmup, "ready"),
  node(gerade, "ready"),
  node(ungerade, "ready"),
  {
    slug: "negative-exponenten",
    title: "Negative Exponenten",
    short: "Negativ",
    subtitle: "x⁻¹, x⁻² – die Hyperbel",
    emoji: "🪁",
    family: "negativ",
    status: "soon",
  },
  node(wurzel, "ready"),
  {
    slug: "eigenschaften",
    title: "Eigenschaften-Werkzeugkasten",
    short: "Eigenschaften",
    subtitle: "D, W, Symmetrie & Monotonie",
    emoji: "🧰",
    family: "andere",
    status: "soon",
  },
  {
    slug: "potenzgleichungen",
    title: "Potenzgleichungen lösen",
    short: "Gleichungen",
    subtitle: "Lösungsmengen & Sonderfälle",
    emoji: "🧮",
    family: "andere",
    status: "soon",
  },
  {
    slug: "transformationen",
    title: "Verschieben & Strecken",
    short: "Transformation",
    subtitle: "k·(x−c)ⁿ+d mit Schiebereglern",
    emoji: "🎚️",
    family: "andere",
    status: "soon",
  },
  {
    slug: "umkehrfunktionen",
    title: "Umkehrfunktionen",
    short: "Umkehrung",
    subtitle: "Tauschen, auflösen, spiegeln",
    emoji: "🔄",
    family: "andere",
    status: "soon",
  },
];

function node(m: LernModul, status: "ready" | "soon"): PathNode {
  return {
    slug: m.slug,
    title: m.title,
    short: m.short,
    subtitle: m.subtitle,
    emoji: m.emoji,
    family: m.family,
    status,
  };
}
