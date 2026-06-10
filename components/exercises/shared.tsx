"use client";

import { useState, type ReactNode } from "react";
import { MathText } from "@/components/MathText";

export interface ExerciseCommonProps {
  /** Klausurmodus: keine Richtig/Falsch-Rückmeldung, nur speichern */
  examMode?: boolean;
  /** Auswertungsansicht: Eingaben gesperrt, Lösung sofort sichtbar */
  forceReveal?: boolean;
  onResult?: (correct: boolean) => void;
}

export function Prompt({ children }: { children: string }) {
  return (
    <p className="text-[15px] font-semibold leading-relaxed text-ink">
      <MathText>{children}</MathText>
    </p>
  );
}

export function HintToggle({ hint }: { hint?: string }) {
  const [open, setOpen] = useState(false);
  if (!hint) return null;
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-sm font-bold text-amber-600 underline-offset-2 hover:underline"
      >
        {open ? "Tipp verbergen" : "💡 Tipp anzeigen"}
      </button>
      {open && (
        <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <MathText>{hint}</MathText>
        </div>
      )}
    </div>
  );
}

export function FeedbackBanner({
  status,
  message,
}: {
  status: "correct" | "wrong" | "saved";
  message?: string;
}) {
  const cfg = {
    correct: {
      cls: "border-emerald-200 bg-emerald-50 text-emerald-800",
      icon: "🎉",
      def: "Super, das stimmt!",
    },
    wrong: {
      cls: "border-rose-200 bg-rose-50 text-rose-800",
      icon: "💪",
      def: "Noch nicht ganz – schau dir den Tipp oder die Lösung an.",
    },
    saved: {
      cls: "border-slate-200 bg-slate-50 text-slate-700",
      icon: "✓",
      def: "Antwort gespeichert.",
    },
  }[status];
  return (
    <div
      className={`animate-pop rounded-xl2 border p-3 text-sm font-semibold ${cfg.cls}`}
    >
      <span className="mr-1">{cfg.icon}</span>
      {message ?? cfg.def}
    </div>
  );
}

export function SolutionBox({
  children,
  defaultOpen = false,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl2 border border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between p-3 text-sm font-extrabold text-ink"
      >
        <span>📖 Lösungsweg Schritt für Schritt</span>
        <span className="text-slate-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="space-y-2 border-t border-slate-200 p-3 text-sm leading-relaxed text-slate-700">
          {children}
        </div>
      )}
    </div>
  );
}
