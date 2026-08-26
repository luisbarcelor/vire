"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BookIcon, CardsIcon, DonutIcon } from "@/components/icons";

const NAV_ITEMS = [
  { href: "/", label: "Watchlist", icon: CardsIcon },
  { href: "/composition", label: "Composición", icon: DonutIcon },
  { href: "/glossary", label: "Glosario", icon: BookIcon },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen grid-cols-1 bg-canvas text-ink lg:grid-cols-[236px_minmax(0,1fr)]">
      <aside className="flex flex-col gap-8 border-divider border-b p-4 py-6 lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
        <div className="flex items-center gap-2 px-2">
          <span className="grid size-[22px] place-items-center rounded-sm text-[12px] text-accent shadow-[inset_0_0_0_1px_var(--color-accent)]">
            ◴
          </span>
          <span className="font-medium text-[17px] tracking-[-0.01em]">
            Vire
          </span>
        </div>

        <nav className="flex flex-col gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          <div className="flex flex-row gap-1 lg:flex-col">
            {NAV_ITEMS.map(({ href, label, icon: ItemIcon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 font-medium text-[14px] transition-colors ${
                    active
                      ? "bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-accent shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-accent)_45%,transparent)]"
                      : "text-ink hover:bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)]"
                  }`}
                >
                  <ItemIcon className="size-[17px]" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="mt-auto hidden flex-col gap-3 rounded-md bg-surface p-3 shadow-sm lg:flex">
          <div className="text-[10px] text-accent tracking-[0.1em] uppercase">
            Solo descriptivo
          </div>
          <p className="m-0 text-[12px] text-neutral-500 leading-[1.5]">
            Pesos introducidos a mano. Sin precios, sin rentabilidad, sin
            recomendaciones.
          </p>
          <p className="m-0 text-[11px] text-neutral-500 leading-[1.5]">
            Esta aplicación ofrece información educativa, no asesoramiento de
            inversión.
          </p>
        </div>
      </aside>

      <main className="min-w-0 px-6 py-8 pb-16 lg:px-8">{children}</main>
    </div>
  );
}
