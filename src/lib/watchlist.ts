export type Region = "US" | "EU" | "Spain" | "Emerging" | "Other";
export type Sector =
  | "Tech"
  | "Finance"
  | "Healthcare"
  | "Energy"
  | "Consumer"
  | "Other";
export type AssetClass =
  | "Equity"
  | "ETF"
  | "Fund"
  | "Bond"
  | "Crypto"
  | "Other";

export const REGIONS: Region[] = ["US", "EU", "Spain", "Emerging", "Other"];
export const SECTORS: Sector[] = [
  "Tech",
  "Finance",
  "Healthcare",
  "Energy",
  "Consumer",
  "Other",
];
export const ASSET_CLASSES: AssetClass[] = [
  "Equity",
  "ETF",
  "Fund",
  "Bond",
  "Crypto",
  "Other",
];

export interface WatchlistItem {
  id: string;
  identifier: string;
  notes: string;
  weight: number | null;
  region: Region;
  sector: Sector;
  assetClass: AssetClass;
}

const STORAGE_KEY = "vire.watchlist";

export function loadWatchlist(): WatchlistItem[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveWatchlist(items: WatchlistItem[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export type WeightParseResult =
  | { ok: true; value: number | null }
  | { ok: false; error: string };

/** Blank input means "watching only" (null); negative weights are rejected
 * per design-behavior-V1.md — a negative share has no meaning in a
 * composition view and would break the "shares sum to 100%" guarantee.
 * Non-numeric input is rejected too, since a NaN weight would silently
 * corrupt the same guarantee. */
export function parseWeight(raw: string): WeightParseResult {
  if (raw.trim() === "") return { ok: true, value: null };
  const value = Number(raw);
  if (Number.isNaN(value)) {
    return { ok: false, error: "Weight must be a number." };
  }
  if (value < 0) return { ok: false, error: "Weight can't be negative." };
  return { ok: true, value };
}
