import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { GlossaryTerm } from "@/lib/glossary";

const CONTENT_DIR = path.join(process.cwd(), "src/content/glossary");

type SectionKey =
  | "definicionSencilla"
  | "porQueImporta"
  | "notaEspana"
  | "verifyNotes";

const SECTION_KEYS: Record<string, SectionKey> = {
  "Definición sencilla": "definicionSencilla",
  "Por qué importa": "porQueImporta",
  "Nota específica de España": "notaEspana",
  "Verificar antes de publicar": "verifyNotes",
};

function parseSections(body: string): Partial<Record<SectionKey, string>> {
  const sections: Partial<Record<SectionKey, string>> = {};
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];

  for (const [i, match] of matches.entries()) {
    const key = SECTION_KEYS[match[1].trim()];
    if (!key) continue;
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[i + 1]?.index ?? body.length;
    sections[key] = body.slice(start, end).trim();
  }

  return sections;
}

function loadRawTerms(): Map<string, GlossaryTerm> {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const map = new Map<string, GlossaryTerm>();

  for (const file of files) {
    const id = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const sections = parseSections(content);

    map.set(id, {
      id,
      term: data.term,
      termEn: data.term_en,
      lang: data.lang,
      category: data.category,
      definicionSencilla: sections.definicionSencilla ?? "",
      porQueImporta: sections.porQueImporta ?? null,
      notaEspana: sections.notaEspana ?? null,
      verifyNotes: sections.verifyNotes ?? null,
      lastVerified: data.last_verified ?? null,
      related: Array.isArray(data.related) ? data.related : [],
    });
  }

  return map;
}

/**
 * Mirrors related links at load time only — never written back to the source
 * .md files (design-behavior-V1.md). A related id that doesn't resolve to a
 * loaded term is dropped silently: the glossary is incomplete by design, and
 * a missing target just means that entry hasn't been authored yet.
 */
export function loadGlossaryTerms(): GlossaryTerm[] {
  const map = loadRawTerms();

  for (const term of map.values()) {
    for (const relatedId of term.related) {
      const target = map.get(relatedId);
      if (target && !target.related.includes(term.id)) {
        target.related.push(term.id);
      }
    }
  }

  return Array.from(map.values())
    .map((term) => ({
      ...term,
      related: term.related.filter((relatedId) => map.has(relatedId)),
    }))
    .sort((a, b) => a.term.localeCompare(b.term, "es"));
}
