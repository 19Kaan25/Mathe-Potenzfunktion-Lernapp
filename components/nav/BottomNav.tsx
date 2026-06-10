"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Lernpfad", icon: "🧭" },
  { href: "/ueben", label: "Üben", icon: "✏️" },
  { href: "/probeklausur", label: "Klausur", icon: "📝" },
  { href: "/fortschritt", label: "Ich", icon: "⭐" },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-slate-200 bg-white/95 backdrop-blur"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {tabs.map((t) => {
          const active = isActive(t.href);
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold transition ${
                  active ? "text-ink" : "text-slate-400"
                }`}
              >
                <span
                  className={`text-xl transition ${active ? "scale-110" : ""}`}
                >
                  {t.icon}
                </span>
                {t.label}
                <span
                  className={`mt-0.5 h-1 w-1 rounded-full ${
                    active ? "bg-ink" : "bg-transparent"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
