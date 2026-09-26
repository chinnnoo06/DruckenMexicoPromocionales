"use client";

import Link from "next/link";
import { FaChevronRight, FaHouse } from "react-icons/fa6";

import { useCatalogOriginStore } from "@/store/catalogOriginStore";

export type TProductBreadcrumbProps = {
  productName: string;
  isAdmin?: boolean;
};

export const ProductBreadcrumb = ({ productName, isAdmin = false }: TProductBreadcrumbProps) => {
  const origin = useCatalogOriginStore((state) => state.origin);

  const base = isAdmin ? "/admin/catalogo" : "/catalogo";
  const catalogHref = origin ? `${base}/${origin.category}/${origin.page}` : `${base}/todos/1`;

  const items = [
    ...(isAdmin
      ? []
      : [{ label: "Inicio", href: "/", icon: <FaHouse className="h-2.5 w-2.5 lg:h-3 lg:w-3" aria-hidden="true" /> }]),
    { label: "Catálogo", href: catalogHref },
    { label: productName },
  ];

  return (
    <nav aria-label="Ruta de navegación">
      <ol className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-[#9F531B]/25 bg-linear-to-r from-[#9F531B]/5 to-[#7C3E13]/10 px-4 py-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          const keepsScroll = origin !== null && item.href === catalogHref;

          return (
            <li key={item.label} className="flex items-center gap-2 min-w-0">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  scroll={!keepsScroll}
                  className="text-xs lg:text-sm text-[#1A1615]/60 hover:text-[#9F531B] transition-colors duration-200 whitespace-nowrap flex items-center gap-1.5"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="text-xs lg:text-sm font-semibold text-[#9F531B] truncate"
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <FaChevronRight
                  className="h-2.5 w-2.5 lg:h-3 lg:w-3 shrink-0 text-[#9F531B]/40"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
