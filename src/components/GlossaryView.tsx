"use client";

import { useMemo, useState } from "react";
import { SearchIcon, XIcon } from "@/components/icons";
import { CATEGORY_LABELS, type GlossaryTerm } from "@/lib/glossary";

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-canvas p-3 shadow-sm">
      <div className="mb-1 text-[10px] text-neutral-500 tracking-[0.1em] uppercase">
        Nota específica de España
      </div>
      <p className="m-0 text-[13px] text-neutral-500 leading-[1.55]">
        {children}
      </p>
    </div>
  );
}

export function GlossaryView({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const byId = useMemo(() => {
    const map = new Map<string, GlossaryTerm>();
    for (const term of terms) map.set(term.id, term);
    return map;
  }, [terms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return terms;
    return terms.filter((term) => term.term.toLowerCase().includes(q));
  }, [terms, query]);

  const open = openId ? byId.get(openId) : null;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 mb-1 font-medium text-[32px] tracking-[-0.015em]">
            Glosario
          </h1>
          <p className="m-0 text-[13px] text-neutral-500">
            Términos de inversión y fiscalidad en España. Pulsa uno para abrir
            la ficha.
          </p>
        </div>
        <div className="relative w-full max-w-[220px]">
          <SearchIcon className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-neutral-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar término"
            className="w-full min-h-9 rounded-md border border-divider bg-canvas py-1.5 pr-2.5 pl-8 text-[14px] text-ink outline-none focus-visible:border-accent"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[14px] text-neutral-500">
          Ningún término coincide con la búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-6 gap-y-2">
          {filtered.map((term) => (
            <button
              key={term.id}
              type="button"
              onClick={() => setOpenId(term.id)}
              className="flex items-baseline gap-3 border-divider border-b py-3 text-left"
            >
              <span className="flex-1 font-medium text-[14px]">
                {term.term}
              </span>
              <span className="text-[11px] text-neutral-500">
                {CATEGORY_LABELS[term.category]}
              </span>
            </button>
          ))}
        </div>
      )}

      {open ? (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-neutral-900)_55%,transparent)]"
            onClick={() => setOpenId(null)}
          />
          <aside className="absolute top-0 right-0 bottom-0 flex w-full max-w-[380px] flex-col gap-4 overflow-y-auto bg-surface p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="text-[10px] text-accent tracking-[0.1em] uppercase">
                  {CATEGORY_LABELS[open.category]}
                </div>
                <h2 className="m-0 mt-1 font-medium text-[20px]">
                  {open.term}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Cerrar"
                className="grid size-9 flex-none place-items-center rounded-md border border-divider hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)]"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            <p className="m-0 text-[14px] leading-[1.6]">
              {open.definicionSencilla}
            </p>

            {open.porQueImporta ? (
              <p className="m-0 text-[13px] text-neutral-500 leading-[1.55]">
                {open.porQueImporta}
              </p>
            ) : null}

            {open.notaEspana ? <NoteBox>{open.notaEspana}</NoteBox> : null}

            {open.related.length > 0 ? (
              <div className="flex flex-col gap-2">
                <div className="text-[10px] text-neutral-500 tracking-[0.1em] uppercase">
                  Términos relacionados
                </div>
                <div className="flex flex-wrap gap-2">
                  {open.related.map((relatedId) => {
                    const related = byId.get(relatedId);
                    if (!related) return null;
                    return (
                      <button
                        key={relatedId}
                        type="button"
                        onClick={() => setOpenId(relatedId)}
                        className="rounded-[6px] border border-accent px-2.5 py-[3px] text-[11px] text-accent"
                      >
                        {related.term}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {open.lastVerified ? (
              <p className="m-0 text-[11px] text-neutral-500 leading-[1.5]">
                Verificado: {open.lastVerified}
              </p>
            ) : null}

            <p className="m-0 mt-auto text-[11px] text-neutral-500 leading-[1.5]">
              Información general con fines descriptivos. No constituye
              asesoramiento fiscal ni de inversión.
            </p>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
