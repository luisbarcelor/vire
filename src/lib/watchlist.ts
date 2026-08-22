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
