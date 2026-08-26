"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type CompositionBreakdown,
  computeComposition,
  type PortfolioComposition,
} from "@/lib/composition";
import { loadWatchlist } from "@/lib/watchlist";

const BREAKDOWN_TITLES: Record<CompositionBreakdown["key"], string> = {
  region: "Región",
  sector: "Sector",
  assetClass: "Clase de activo",
};

function Breakdown({ breakdown }: { breakdown: CompositionBreakdown }) {
  return (
    <section>
      <h2>{BREAKDOWN_TITLES[breakdown.key]}</h2>
      <ul>
        {breakdown.rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <span>{row.share.toFixed(1)}%</span>
            <div style={{ background: "#e5e5e5", height: 8, width: "100%" }}>
              <div
                style={{
                  background: "#888",
                  height: 8,
                  width: `${row.share}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Composition() {
  const [composition, setComposition] = useState<PortfolioComposition | null>(
    null,
  );

  useEffect(() => {
    setComposition(computeComposition(loadWatchlist()));
  }, []);

  return (
    <main>
      <h1>Composición de la cartera</h1>
      <p>
        <Link href="/">Volver al watchlist</Link>
      </p>

      {composition === null ? null : composition.kind === "empty" ? (
        <p>Todavía no hay elementos con peso registrado.</p>
      ) : (
        <>
          {composition.breakdowns.map((breakdown) => (
            <Breakdown key={breakdown.key} breakdown={breakdown} />
          ))}
          <p>
            Basado en {composition.includedCount} de {composition.totalCount}{" "}
            elementos seguidos.
          </p>
          <p>
            Calculado a partir de las etiquetas que has introducido, no de
            posiciones verificadas.
          </p>
        </>
      )}
    </main>
  );
}
