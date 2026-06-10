import type { PowerFn } from "@/lib/types";
import { plotSegments } from "@/lib/math/valueTable";

export interface PlotCurve {
  fn: PowerFn;
  stroke: string;
  dashed?: boolean;
  width?: number;
}

export interface PlotPoint {
  x: number;
  y: number;
  color?: string;
  label?: string;
  hollow?: boolean;
}

interface Props {
  curves: PlotCurve[];
  xRange?: [number, number];
  yRange?: [number, number];
  points?: PlotPoint[];
  /** y-Achse als Symmetrieachse hervorheben */
  highlightYAxis?: boolean;
  /** 1. Winkelhalbierende y = x einzeichnen (für Umkehrfunktionen) */
  showDiagonal?: boolean;
  unit?: number; // Pixel pro Einheit
  className?: string;
}

export function FunctionPlot({
  curves,
  xRange = [-4, 4],
  yRange = [-4, 4],
  points = [],
  highlightYAxis = false,
  showDiagonal = false,
  unit = 24,
  className,
}: Props) {
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const pad = 8;
  const W = (xMax - xMin) * unit + pad * 2;
  const H = (yMax - yMin) * unit + pad * 2;

  const px = (x: number) => pad + (x - xMin) * unit;
  const py = (y: number) => pad + (yMax - y) * unit;

  const xTicks: number[] = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) xTicks.push(x);
  const yTicks: number[] = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) yTicks.push(y);

  const inView = (p: { x: number; y: number }) =>
    p.x >= xMin - 0.01 &&
    p.x <= xMax + 0.01 &&
    p.y >= yMin - 0.01 &&
    p.y <= yMax + 0.01;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className ?? "w-full"}
      style={{ maxWidth: W, touchAction: "manipulation" }}
      role="img"
    >
      <rect x={0} y={0} width={W} height={H} rx={10} fill="#ffffff" />

      {/* Gitter */}
      {xTicks.map((x) => (
        <line
          key={`gx${x}`}
          x1={px(x)}
          y1={pad}
          x2={px(x)}
          y2={H - pad}
          stroke={x === 0 ? "transparent" : "#eef2f7"}
          strokeWidth={1}
        />
      ))}
      {yTicks.map((y) => (
        <line
          key={`gy${y}`}
          x1={pad}
          y1={py(y)}
          x2={W - pad}
          y2={py(y)}
          stroke={y === 0 ? "transparent" : "#eef2f7"}
          strokeWidth={1}
        />
      ))}

      {/* y-Achse als Symmetrieachse hervorheben */}
      {highlightYAxis && xMin < 0 && xMax > 0 && (
        <line
          x1={px(0)}
          y1={pad}
          x2={px(0)}
          y2={H - pad}
          stroke="#f59e0b"
          strokeWidth={3}
          strokeDasharray="4 4"
          opacity={0.8}
        />
      )}

      {/* Diagonale y = x */}
      {showDiagonal && (
        <line
          x1={px(Math.max(xMin, yMin))}
          y1={py(Math.max(xMin, yMin))}
          x2={px(Math.min(xMax, yMax))}
          y2={py(Math.min(xMax, yMax))}
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
      )}

      {/* Achsen */}
      {yMin < 0 && yMax > 0 && (
        <line
          x1={pad}
          y1={py(0)}
          x2={W - pad}
          y2={py(0)}
          stroke="#475569"
          strokeWidth={1.6}
        />
      )}
      {xMin < 0 && xMax > 0 && (
        <line
          x1={px(0)}
          y1={pad}
          x2={px(0)}
          y2={H - pad}
          stroke="#475569"
          strokeWidth={1.6}
        />
      )}

      {/* Achsenbeschriftung */}
      {xTicks
        .filter((x) => x !== 0)
        .map((x) => (
          <text
            key={`tx${x}`}
            x={px(x)}
            y={yMin < 0 && yMax > 0 ? py(0) + 12 : H - 2}
            fontSize={9}
            fill="#94a3b8"
            textAnchor="middle"
          >
            {x}
          </text>
        ))}
      {yTicks
        .filter((y) => y !== 0)
        .map((y) => (
          <text
            key={`ty${y}`}
            x={xMin < 0 && xMax > 0 ? px(0) - 4 : 4}
            y={py(y) + 3}
            fontSize={9}
            fill="#94a3b8"
            textAnchor="end"
          >
            {y}
          </text>
        ))}

      {/* Kurven */}
      {curves.map((c, ci) =>
        plotSegments(c.fn, xMin, xMax).map((seg, si) => {
          const clipped = seg.filter(
            (p) => p.y >= yMin - 2 && p.y <= yMax + 2,
          );
          if (clipped.length < 2) return null;
          const d = clipped
            .map(
              (p, i) =>
                `${i === 0 ? "M" : "L"} ${px(p.x).toFixed(1)} ${py(p.y).toFixed(1)}`,
            )
            .join(" ");
          return (
            <path
              key={`c${ci}-${si}`}
              d={d}
              fill="none"
              stroke={c.stroke}
              strokeWidth={c.width ?? 2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={c.dashed ? "6 5" : undefined}
            />
          );
        }),
      )}

      {/* Markierte Punkte */}
      {points.filter(inView).map((p, i) => (
        <g key={`p${i}`}>
          <circle
            cx={px(p.x)}
            cy={py(p.y)}
            r={4}
            fill={p.hollow ? "#ffffff" : (p.color ?? "#1f2433")}
            stroke={p.color ?? "#1f2433"}
            strokeWidth={2}
          />
          {p.label && (
            <text
              x={px(p.x) + 6}
              y={py(p.y) - 6}
              fontSize={10}
              fill={p.color ?? "#1f2433"}
              fontWeight={700}
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
