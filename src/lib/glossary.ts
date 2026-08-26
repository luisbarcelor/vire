export type GlossaryCategory = "tax" | "broker" | "fx" | "risk" | "markets";

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  tax: "Fiscalidad",
  broker: "Bróker",
  fx: "Divisa",
  risk: "Riesgo",
  markets: "Mercados",
};

export interface GlossaryTerm {
  id: string;
  term: string;
  termEn: string;
  lang: string;
  category: GlossaryCategory;
  definicionSencilla: string;
  porQueImporta: string | null;
  notaEspana: string | null;
  /** Editorial-only note; never render this in end-user UI. */
  verifyNotes: string | null;
  lastVerified: string | null;
  related: string[];
}
