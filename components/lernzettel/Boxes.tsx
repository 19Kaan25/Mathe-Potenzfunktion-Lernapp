import type { ReactNode } from "react";

export function Section({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-5">
      <h2 className="mb-2 flex items-center gap-2 text-lg font-extrabold text-ink">
        {emoji && <span className="text-xl">{emoji}</span>}
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}

export function MerkeBox({
  title = "Merke dir",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl2 border border-amber-200 bg-amber-50 p-4">
      <div className="mb-1 flex items-center gap-2 font-extrabold text-amber-800">
        <span className="text-lg">💡</span> {title}
      </div>
      <div className="text-[15px] leading-relaxed text-amber-900">
        {children}
      </div>
    </div>
  );
}

export function StolperstelleBox({
  title = "Stolperstelle",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl2 border border-rose-200 bg-rose-50 p-4">
      <div className="mb-1 flex items-center gap-2 font-extrabold text-rose-700">
        <span className="text-lg">⚠️</span> {title}
      </div>
      <div className="text-[15px] leading-relaxed text-rose-900">
        {children}
      </div>
    </div>
  );
}

export function BildBox({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="rounded-xl2 border border-slate-200 bg-white p-3">
      <div className="flex justify-center">{children}</div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function InfoCallout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl2 border border-sky-200 bg-sky-50 p-4 text-[15px] leading-relaxed text-sky-900">
      {children}
    </div>
  );
}
