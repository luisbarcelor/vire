import type { FormEvent } from "react";
import { XIcon } from "@/components/icons";
import {
  ASSET_CLASSES,
  type AssetClass,
  REGIONS,
  type Region,
  SECTORS,
  type Sector,
} from "@/lib/watchlist";

export type HoldingFormState = {
  identifier: string;
  notes: string;
  weight: string;
  region: Region;
  sector: Sector;
  assetClass: AssetClass;
};

export const EMPTY_HOLDING_FORM: HoldingFormState = {
  identifier: "",
  notes: "",
  weight: "",
  region: REGIONS[0],
  sector: SECTORS[0],
  assetClass: ASSET_CLASSES[0],
};

const inputClass =
  "w-full min-h-9 rounded-md border border-divider bg-canvas px-2.5 py-1.5 text-[14px] text-ink outline-none focus-visible:border-accent";
const labelClass = "mb-[5px] block text-[12px] text-neutral-400";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function HoldingDialog({
  title,
  form,
  onChange,
  error,
  onCancel,
  onSubmit,
  onDelete,
  submitLabel,
}: {
  title: string;
  form: HoldingFormState;
  onChange: (next: HoldingFormState) => void;
  error: string | null;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  submitLabel: string;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[color-mix(in_srgb,var(--color-neutral-900)_50%,transparent)] p-4">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-[440px] flex-col gap-3 rounded-lg bg-surface p-4 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 font-medium text-[20px]">{title}</div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cerrar"
            className="grid size-9 flex-none place-items-center rounded-md border border-divider hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)]"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Identificador" htmlFor="holding-identifier">
            <input
              id="holding-identifier"
              required
              className={inputClass}
              value={form.identifier}
              onChange={(event) =>
                onChange({ ...form, identifier: event.target.value })
              }
            />
          </Field>
          <Field label="Peso (%)" htmlFor="holding-weight">
            <input
              id="holding-weight"
              type="number"
              className={inputClass}
              value={form.weight}
              placeholder="Solo watchlist"
              onChange={(event) =>
                onChange({ ...form, weight: event.target.value })
              }
            />
          </Field>
        </div>

        <Field label="Notas" htmlFor="holding-notes">
          <input
            id="holding-notes"
            className={inputClass}
            value={form.notes}
            onChange={(event) =>
              onChange({ ...form, notes: event.target.value })
            }
          />
        </Field>

        <div className="grid grid-cols-3 gap-3">
          <Field label="Región" htmlFor="holding-region">
            <select
              id="holding-region"
              required
              className={inputClass}
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
          </Field>
          <Field label="Sector" htmlFor="holding-sector">
            <select
              id="holding-sector"
              required
              className={inputClass}
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
          </Field>
          <Field label="Clase" htmlFor="holding-asset-class">
            <select
              id="holding-asset-class"
              required
              className={inputClass}
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
          </Field>
        </div>

        <p className="m-0 text-[12px] text-neutral-500 leading-[1.5]">
          Deja el peso en blanco para hacer seguimiento sin incluirlo en la
          composición.
        </p>

        {error ? (
          <p role="alert" className="m-0 text-[13px] text-accent-300">
            {error}
          </p>
        ) : null}

        <div className="mt-2 flex justify-end gap-2">
          {onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center justify-center rounded-md border border-divider px-4 py-2 font-medium text-[14px] hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)]"
            >
              Eliminar
            </button>
          ) : null}
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-md border border-divider px-4 py-2 font-medium text-[14px] hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-accent px-4 py-2 font-medium text-[14px] text-accent hover:bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
