"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useHeaderFooter } from "@/hooks/useHeaderFooter";
import { useLogout } from "@/hooks/useLogout";
import { getNavItems, isLinkActive } from "@/utils/navigation";

export type TFooterNavProps = {
  /** Lo decide el layout en el servidor: el de /admin renderiza la navegación del panel. */
  isAdmin?: boolean;
};

/** Mismos enlaces que el header: secciones con scroll en el inicio, rutas fuera de él. */
export const FooterNav = ({ isAdmin = false }: TFooterNavProps) => {
  const { scrollToSection, navigateToSection, isInicio } = useHeaderFooter();
  const pathname = usePathname();
  const handleLogout = useLogout();

  const items = getNavItems(isAdmin, isInicio);
  const onSectionSelect = isInicio ? scrollToSection : navigateToSection;

  return (
    <nav className="flex flex-col gap-2 text-center md:text-left">
      {items.map((item) => {
        const isActive =
          item.kind === "link" ? isLinkActive(pathname, item.to) : false;

        const className = `relative py-1 font-medium text-sm lg:text-base transition-all duration-300
          hover:translate-x-1 block text-center md:text-left w-full
          ${isActive ? "text-[#9F531B] font-semibold" : "text-[#1A1615] hover:text-[#9F531B]"}`;

        if (item.kind === "link") {
          return (
            <Link key={item.to} href={item.to} className={className}>
              {item.text}
            </Link>
          );
        }

        if (item.kind === "logout") {
          return (
            <button key="logout" type="button" onClick={handleLogout} className={className}>
              {item.text}
            </button>
          );
        }

        return (
          <button
            key={item.sectionId}
            type="button"
            onClick={() => onSectionSelect(item.sectionId)}
            className={className}
          >
            {item.text}
          </button>
        );
      })}
    </nav>
  );
};
