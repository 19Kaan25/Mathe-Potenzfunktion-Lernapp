"use client";

import { useCallback, useEffect, useState } from "react";

export interface ModuleProgress {
  completed: boolean;
  stars: number; // 0..3
}

export interface ProgressState {
  modules: Record<string, ModuleProgress>;
  streak: { count: number; last: string | null };
  examBest: number | null; // bestes Ergebnis in Prozent
}

const KEY = "potenz-profi-progress-v1";

const empty: ProgressState = {
  modules: {},
  streak: { count: 0, last: null },
  examBest: null,
};

function load(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

function save(state: ProgressState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  const update = useCallback((fn: (prev: ProgressState) => ProgressState) => {
    setState((prev) => {
      const next = fn(prev);
      save(next);
      return next;
    });
  }, []);

  const completeModule = useCallback(
    (slug: string, stars: number) => {
      update((prev) => {
        const existing = prev.modules[slug];
        const bestStars = Math.max(existing?.stars ?? 0, stars);
        return {
          ...prev,
          modules: {
            ...prev.modules,
            [slug]: { completed: true, stars: bestStars },
          },
        };
      });
    },
    [update],
  );

  const recordExam = useCallback(
    (pct: number) => {
      update((prev) => ({
        ...prev,
        examBest: Math.max(prev.examBest ?? 0, Math.round(pct)),
      }));
    },
    [update],
  );

  /** Streak bei jedem Lern-Tag aktualisieren */
  const touchStreak = useCallback(() => {
    update((prev) => {
      const t = todayISO();
      const last = prev.streak.last;
      if (last === t) return prev;
      let count = 1;
      if (last) {
        const diff = daysBetween(last, t);
        if (diff === 1) count = prev.streak.count + 1;
        else if (diff <= 0) count = prev.streak.count;
      }
      return { ...prev, streak: { count, last: t } };
    });
  }, [update]);

  const reset = useCallback(() => {
    update(() => empty);
  }, [update]);

  return { state, ready, completeModule, recordExam, touchStreak, reset };
}
