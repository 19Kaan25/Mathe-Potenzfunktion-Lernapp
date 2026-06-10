import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl2 border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "soft" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-extrabold transition active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100";
  const styles = {
    primary: "bg-ink text-white hover:bg-slate-800",
    soft: "bg-slate-100 text-ink hover:bg-slate-200",
    ghost: "text-slate-500 hover:text-ink",
  }[variant];
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${className}`}
    >
      {children}
    </span>
  );
}

export function ProgressRing({
  value,
  size = 72,
  stroke = 8,
  color = "#0284c7",
  children,
}: {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute grid place-items-center text-center">
        {children}
      </div>
    </div>
  );
}
