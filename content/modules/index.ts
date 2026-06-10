import type { Family, LernModul } from "@/lib/types";
import { warmup } from "@/content/modules/00-warmup";
import { gerade } from "@/content/modules/01-gerade";
import { ungerade } from "@/content/modules/02-ungerade";
import { negativ } from "@/content/modules/03-negativ";
import { wurzel } from "@/content/modules/04-wurzel";
import { eigenschaften } from "@/content/modules/05-eigenschaften";
import { potenzgleichungen } from "@/content/modules/06-potenzgleichungen";
import { transformationen } from "@/content/modules/07-transformationen";
import { umkehr } from "@/content/modules/08-umkehr";

export interface PathNode {
  slug: string;
  title: string;
  short: string;
  subtitle: string;
  emoji: string;
  family: Family;
  status: "ready" | "soon";
}

const readyModules: LernModul[] = [
  warmup,
  gerade,
  ungerade,
  negativ,
  wurzel,
  eigenschaften,
  potenzgleichungen,
  transformationen,
  umkehr,
];

export const modulesBySlug: Record<string, LernModul> = Object.fromEntries(
  readyModules.map((m) => [m.slug, m]),
);

/** Kompletter Lernpfad in der richtigen Reihenfolge. */
export const learnPath: PathNode[] = readyModules.map((m) => node(m, "ready"));

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
