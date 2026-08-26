/**
 * Fixed categorical palette, assigned by row position (not by value) — color
 * here distinguishes categories, it never signals magnitude or "good/bad"
 * (design-ui-guardrails-V1.md prohibits alarm-style coloring).
 */
const PALETTE = [
  "var(--color-accent-400)",
  "var(--color-accent-600)",
  "var(--color-neutral-500)",
  "var(--color-accent-800)",
  "var(--color-neutral-800)",
  "var(--color-accent-300)",
];

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Donut({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; share: number }[];
}) {
  let offset = 0;

  return (
    <div className="flex flex-col gap-4 rounded-md bg-surface p-6 shadow-sm">
      <div className="text-[10px] tracking-[0.1em] text-accent uppercase">
        {title}
      </div>

      <div className="grid place-items-center py-2">
        <svg viewBox="0 0 120 120" className="size-[150px] overflow-visible">
          <title>{`Distribución por ${title.toLowerCase()}`}</title>
          <g
            transform="rotate(-90 60 60)"
            fill="none"
            strokeWidth={13}
            strokeLinecap="butt"
          >
            {rows.map((row, i) => {
              const dash = (row.share / 100) * CIRCUMFERENCE;
              const circle = (
                <circle
                  key={row.label}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  stroke={PALETTE[i % PALETTE.length]}
                  strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += dash;
              return circle;
            })}
          </g>
          <text
            x="60"
            y="57"
            textAnchor="middle"
            fill="var(--color-ink)"
            fontSize="21"
            fontWeight={500}
          >
            {rows[0] ? `${Math.round(rows[0].share)}%` : "—"}
          </text>
          <text
            x="60"
            y="72"
            textAnchor="middle"
            fill="var(--color-neutral-500)"
            fontSize="10"
            letterSpacing="0.06em"
          >
            {rows[0]?.label ?? ""}
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <div key={row.label} className="flex items-center gap-2 text-[13px]">
            <span
              className="size-2 flex-none rounded-[2px]"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            <span className="flex-1">{row.label}</span>
            <span className="tabular-nums">
              {row.share.toLocaleString("es-ES", { maximumFractionDigits: 1 })}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
