import type {
  AssetClass,
  Region,
  Sector,
  WatchlistItem,
} from "@/lib/watchlist";

export type CompositionRow = { label: string; share: number };

export type CompositionBreakdown = {
  key: "region" | "sector" | "assetClass";
  rows: CompositionRow[];
};

export type PortfolioComposition =
  | { kind: "empty"; totalCount: number }
  | {
      kind: "computed";
      includedCount: number;
      totalCount: number;
      breakdowns: CompositionBreakdown[];
    };

function breakdownBy<K extends string>(
  included: WatchlistItem[],
  totalWeight: number,
  key: "region" | "sector" | "assetClass",
  pick: (item: WatchlistItem) => K,
): CompositionBreakdown {
  const sums = new Map<K, number>();
  for (const item of included) {
    const label = pick(item);
    sums.set(label, (sums.get(label) ?? 0) + (item.weight as number));
  }

  const rows = Array.from(sums.entries())
    .map(([label, sum]) => ({ label, share: (sum / totalWeight) * 100 }))
    .sort((a, b) => b.share - a.share);

  return { key, rows };
}

/**
 * Derived on demand from the watchlist; never persisted (design-behavior-V1.md).
 * Weightless items mean "watching only" and are excluded before normalizing,
 * so shares always sum to 100% regardless of what was typed.
 */
export function computeComposition(
  items: WatchlistItem[],
): PortfolioComposition {
  const included = items.filter((item) => item.weight !== null);
  const totalWeight = included.reduce(
    (sum, item) => sum + (item.weight as number),
    0,
  );

  if (included.length === 0 || totalWeight === 0) {
    return { kind: "empty", totalCount: items.length };
  }

  return {
    kind: "computed",
    includedCount: included.length,
    totalCount: items.length,
    breakdowns: [
      breakdownBy<Region>(included, totalWeight, "region", (i) => i.region),
      breakdownBy<Sector>(included, totalWeight, "sector", (i) => i.sector),
      breakdownBy<AssetClass>(
        included,
        totalWeight,
        "assetClass",
        (i) => i.assetClass,
      ),
    ],
  };
}
