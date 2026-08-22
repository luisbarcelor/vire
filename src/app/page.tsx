"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  ASSET_CLASSES,
  type AssetClass,
  loadWatchlist,
  REGIONS,
  type Region,
  SECTORS,
  type Sector,
  saveWatchlist,
  type WatchlistItem,
} from "@/lib/watchlist";

const emptyForm = {
  identifier: "",
  notes: "",
  weight: "",
  region: REGIONS[0],
  sector: SECTORS[0],
  assetClass: ASSET_CLASSES[0],
};

export default function Home() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setItems(loadWatchlist());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newItem: WatchlistItem = {
      id: crypto.randomUUID(),
      identifier: form.identifier,
      notes: form.notes,
      weight: form.weight === "" ? null : Number(form.weight),
      region: form.region as Region,
      sector: form.sector as Sector,
      assetClass: form.assetClass as AssetClass,
    };

    const next = [...items, newItem];
    setItems(next);
    saveWatchlist(next);
    setForm(emptyForm);
  }

  return (
    <main>
      <h1>Vire</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Identifier
          <input
            required
            value={form.identifier}
            onChange={(event) =>
              setForm({ ...form, identifier: event.target.value })
            }
          />
        </label>

        <label>
          Notes
          <input
            value={form.notes}
            onChange={(event) =>
              setForm({ ...form, notes: event.target.value })
            }
          />
        </label>

        <label>
          Weight (%)
          <input
            type="number"
            value={form.weight}
            onChange={(event) =>
              setForm({ ...form, weight: event.target.value })
            }
          />
        </label>

        <label>
          Region
          <select
            required
            value={form.region}
            onChange={(event) =>
              setForm({ ...form, region: event.target.value as Region })
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
              setForm({ ...form, sector: event.target.value as Sector })
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
              setForm({
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

        <button type="submit">Add</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.identifier} — {item.region} / {item.sector} /{" "}
            {item.assetClass}
            {item.weight !== null ? ` — ${item.weight}%` : " — watching only"}
            {item.notes ? ` — ${item.notes}` : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
