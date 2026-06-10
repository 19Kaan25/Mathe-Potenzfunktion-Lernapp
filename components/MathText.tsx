import katex from "katex";

function render(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    throwOnError: false,
    displayMode,
    strict: false,
  });
}

export function InlineMath({ tex }: { tex: string }) {
  return (
    <span
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: render(tex, false) }}
    />
  );
}

export function BlockMath({ tex }: { tex: string }) {
  return (
    <div
      className="my-1 overflow-x-auto py-1 text-center"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: render(tex, true) }}
    />
  );
}

/**
 * Text mit eingebetteter Inline-Mathe: Abschnitte zwischen $...$
 * werden als Formel gerendert, der Rest als normaler Text.
 * Beispiel: "Berechne $f(x)=x^2$ für $x=3$."
 */
export function MathText({ children }: { children: string }) {
  const parts = children.split(/(\$[^$]*\$)/g).filter((p) => p !== "");
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={i} tex={part.slice(1, -1)} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
