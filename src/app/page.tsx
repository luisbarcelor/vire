"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  EMPTY_HOLDING_FORM,
  HoldingDialog,
  type HoldingFormState,
} from "@/components/HoldingDialog";
import { PencilIcon, PlusIcon, TrashIcon } from "@/components/icons";
import {
  loadWatchlist,
  parseWeight,
  saveWatchlist,
  type WatchlistItem,
} from "@/lib/watchlist";

function formStateFromItem(item: WatchlistItem): HoldingFormState {
  return {
    identifier: item.identifier,
    notes: item.notes,
    weight: item.weight === null ? "" : String(item.weight),
    region: item.region,
    sector: item.sector,
    assetClass: item.assetClass,
  };
}

function Tag({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "accent" | "neutral" | "outline";
}) {
  const variantClass = {
    accent: "bg-accent-800 text-accent-100",
    neutral: "bg-neutral-800 text-neutral-100",
    outline: "border border-accent text-accent",
  }[variant];
  return (
    <span
      className={`inline-flex items-center rounded-[6px] px-2.5 py-[3px] text-[11px] tracking-[0.02em] ${variantClass}`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [dialog, setDialog] = useState<
    { mode: "add" } | { mode: "edit"; id: string } | null
  >(null);
  const [form, setForm] = useState(EMPTY_HOLDING_FORM);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadWatchlist());
  }, []);

  function openAdd() {
    setForm(EMPTY_HOLDING_FORM);
    setError(null);
    setDialog({ mode: "add" });
  }

  function openEdit(item: WatchlistItem) {
    setForm(formStateFromItem(item));
    setError(null);
    setDialog({ mode: "edit", id: item.id });
  }

  function closeDialog() {
    setDialog(null);
    setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dialog) return;

    const weightResult = parseWeight(form.weight);
    if (!weightResult.ok) {
      setError(weightResult.error);
      return;
    }

    const next =
      dialog.mode === "add"
        ? [
            ...items,
            {
              id: crypto.randomUUID(),
              identifier: form.identifier,
              notes: form.notes,
              weight: weightResult.value,
              region: form.region,
              sector: form.sector,
              assetClass: form.assetClass,
            },
          ]
        : items.map((item) =>
            item.id === dialog.id
              ? {
                  ...item,
                  identifier: form.identifier,
                  notes: form.notes,
                  weight: weightResult.value,
                  region: form.region,
                  sector: form.sector,
                  assetClass: form.assetClass,
                }
              : item,
          );

    setItems(next);
    saveWatchlist(next);
    closeDialog();
  }

  function handleDelete(id: string) {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    saveWatchlist(next);
    if (dialog?.mode === "edit" && dialog.id === id) closeDialog();
  }

  const sorted = [...items].sort((a, b) => (b.weight ?? -1) - (a.weight ?? -1));
  const weighted = items.filter((item) => item.weight !== null);
  const weightSum = weighted.reduce((sum, item) => sum + (item.weight ?? 0), 0);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 mb-1 font-medium text-[32px] tracking-[-0.015em]">
            Watchlist
          </h1>
          <p className="m-0 text-[13px] text-neutral-500">
            {items.length === 0
              ? "Ninguna posición seguida todavía."
              : `${items.length} posiciones seguidas · pesos suman ${weightSum.toLocaleString(
                  "es-ES",
                  { maximumFractionDigits: 1 },
                )}%`}
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-md border border-accent px-3.5 py-2 font-medium text-[14px] text-accent hover:bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
        >
          <PlusIcon className="size-4" />
          Añadir posición
        </button>
      </div>

      {items.length > 0 ? (
        <p className="mb-6 text-[12px] text-neutral-500">
          Orden: peso descendente
        </p>
      ) : null}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {sorted.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-md bg-surface p-3 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-[38px] flex-none place-items-center rounded-sm bg-neutral-900 text-[11px] text-neutral-500 tracking-[0.04em] shadow-[inset_0_0_0_1px_var(--color-neutral-800)]">
                {item.identifier.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-[17px] leading-[1.2]">
                  {item.identifier}
                </div>
                {item.notes ? (
                  <div className="text-[12px] text-neutral-500 leading-[1.35]">
                    {item.notes}
                  </div>
                ) : null}
              </div>
              <div className="flex-none text-right">
                <div className="font-medium text-[19px] leading-[1.1]">
                  {item.weight === null ? "—" : `${item.weight}%`}
                </div>
                <div className="text-[11px] text-neutral-500">
                  {item.weight === null ? "Solo seguimiento" : ""}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-divider border-t pt-3">
              <Tag variant="accent">{item.region}</Tag>
              <Tag variant="neutral">{item.sector}</Tag>
              <Tag variant="outline">{item.assetClass}</Tag>
              <div className="ml-auto flex gap-1">
                <button
                  type="button"
                  aria-label="Editar"
                  onClick={() => openEdit(item)}
                  className="grid size-7 place-items-center rounded-md text-neutral-500 hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)] hover:text-ink"
                >
                  <PencilIcon className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Eliminar"
                  onClick={() => handleDelete(item.id)}
                  className="grid size-7 place-items-center rounded-md text-neutral-500 hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)] hover:text-ink"
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {dialog ? (
        <HoldingDialog
          title={dialog.mode === "add" ? "Añadir posición" : "Editar posición"}
          form={form}
          onChange={setForm}
          error={error}
          onCancel={closeDialog}
          onSubmit={handleSubmit}
          onDelete={
            dialog.mode === "edit" ? () => handleDelete(dialog.id) : undefined
          }
          submitLabel={
            dialog.mode === "add" ? "Guardar posición" : "Guardar cambios"
          }
        />
      ) : null}
    </div>
  );
}
