"use client";

import { useEffect, useState } from "react";
import { Donut } from "@/components/Donut";
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

export default function Composition() {
  const [composition, setComposition] = useState<PortfolioComposition | null>(
    null,
  );

  useEffect(() => {
    setComposition(computeComposition(loadWatchlist()));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="m-0 mb-1 font-medium text-[32px] tracking-[-0.015em]">
          Composición
        </h1>
        <p className="m-0 text-[13px] text-neutral-500">
          Agregado de las etiquetas de la watchlist. Descriptivo, no es una
          recomendación.
        </p>
      </div>

      {composition === null ? null : composition.kind === "empty" ? (
        <p className="text-[14px] text-neutral-500">
          Todavía no hay elementos con peso registrado.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {composition.breakdowns.map((breakdown) => (
              <Donut
                key={breakdown.key}
                title={BREAKDOWN_TITLES[breakdown.key]}
                rows={breakdown.rows}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2 border-divider border-t pt-6 text-[13px] text-neutral-500 leading-[1.5]">
            <p className="m-0">
              Basado en {composition.includedCount} de {composition.totalCount}{" "}
              elementos seguidos.
            </p>
            <p className="m-0">
              Calculado a partir de las etiquetas que has introducido, no de
              posiciones verificadas.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
