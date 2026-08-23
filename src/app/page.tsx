"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  ASSET_CLASSES,
  type AssetClass,
  loadWatchlist,
  parseWeight,
  REGIONS,
  type Region,
  SECTORS,
  type Sector,
  saveWatchlist,
  type WatchlistItem,
} from "@/lib/watchlist";

type HoldingFormState = {
  identifier: string;
  notes: string;
  weight: string;
  region: Region;
  sector: Sector;
  assetClass: AssetClass;
};

const emptyForm: HoldingFormState = {
  identifier: "",
  notes: "",
  weight: "",
  region: REGIONS[0],
  sector: SECTORS[0],
  assetClass: ASSET_CLASSES[0],
};

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

function HoldingFields({
  form,
  onChange,
}: {
  form: HoldingFormState;
  onChange: (next: HoldingFormState) => void;
}) {
  return (
    <>
      <label>
        Identifier
        <input
          required
          value={form.identifier}
          onChange={(event) =>
            onChange({ ...form, identifier: event.target.value })
          }
        />
      </label>

      <label>
        Notes
        <input
          value={form.notes}
          onChange={(event) => onChange({ ...form, notes: event.target.value })}
        />
      </label>

      <label>
        Weight (%)
        <input
          type="number"
          value={form.weight}
          onChange={(event) =>
            onChange({ ...form, weight: event.target.value })
          }
        />
      </label>

      <label>
        Region
        <select
          required
          value={form.region}
          onChange={(event) =>
            onChange({ ...form, region: event.target.value as Region })
          }
        >
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sector
        <select
          required
          value={form.sector}
          onChange={(event) =>
            onChange({ ...form, sector: event.target.value as Sector })
          }
        >
          {SECTORS.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </label>

      <label>
        Asset class
        <select
          required
          value={form.assetClass}
          onChange={(event) =>
            onChange({
              ...form,
              assetClass: event.target.value as AssetClass,
            })
          }
        >
          {ASSET_CLASSES.map((assetClass) => (
            <option key={assetClass} value={assetClass}>
              {assetClass}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default function Home() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadWatchlist());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const weightResult = parseWeight(form.weight);
    if (!weightResult.ok) {
      setFormError(weightResult.error);
      return;
    }

    const newItem: WatchlistItem = {
      id: crypto.randomUUID(),
      identifier: form.identifier,
      notes: form.notes,
      weight: weightResult.value,
      region: form.region,
      sector: form.sector,
      assetClass: form.assetClass,
    };

    const next = [...items, newItem];
    setItems(next);
    saveWatchlist(next);
    setForm(emptyForm);
    setFormError(null);
  }

  function handleEditStart(item: WatchlistItem) {
    setEditingId(item.id);
    setEditForm(formStateFromItem(item));
    setEditError(null);
  }

  function handleEditCancel() {
    setEditingId(null);
    setEditError(null);
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingId === null) return;

    const weightResult = parseWeight(editForm.weight);
    if (!weightResult.ok) {
      setEditError(weightResult.error);
      return;
    }

    const next = items.map((item) =>
      item.id === editingId
        ? {
            ...item,
            identifier: editForm.identifier,
            notes: editForm.notes,
            weight: weightResult.value,
            region: editForm.region,
            sector: editForm.sector,
            assetClass: editForm.assetClass,
          }
        : item,
    );
    setItems(next);
    saveWatchlist(next);
    setEditingId(null);
    setEditError(null);
  }

  function handleDelete(id: string) {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    saveWatchlist(next);
    if (editingId === id) {
      setEditingId(null);
      setEditError(null);
    }
  }

  return (
    <main>
      <h1>Vire</h1>

      <form onSubmit={handleSubmit}>
        <HoldingFields form={form} onChange={setForm} />
        {formError ? <p role="alert">{formError}</p> : null}
        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map((item) =>
          editingId === item.id ? (
            <li key={item.id}>
              <form onSubmit={handleEditSubmit}>
                <HoldingFields form={editForm} onChange={setEditForm} />
                {editError ? <p role="alert">{editError}</p> : null}
                <button type="submit">Save</button>
                <button type="button" onClick={handleEditCancel}>
                  Cancel
                </button>
              </form>
            </li>
          ) : (
            <li key={item.id}>
              {item.identifier} — {item.region} / {item.sector} /{" "}
              {item.assetClass}
              {item.weight !== null ? ` — ${item.weight}%` : " — watching only"}
              {item.notes ? ` — ${item.notes}` : null}
              <button type="button" onClick={() => handleEditStart(item)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </li>
          ),
        )}
      </ul>
    </main>
  );
}
