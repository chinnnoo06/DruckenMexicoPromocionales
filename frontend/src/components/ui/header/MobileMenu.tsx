"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { TSectionId } from "@/hooks/useHeaderFooter";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useLogout } from "@/hooks/useLogout";
import { isLinkActive, type TNavItem } from "@/utils/navigation";
import { SocialLinks } from "../SocialLinks";

export type TMobileMenuProps = {
  items: TNavItem[];
  activeSectionId: TSectionId | null;
  onSectionSelect: (sectionId: TSectionId) => void;
  menuVisible: boolean;
  scrolled: boolean
};

export const MobileMenu = ({ items, activeSectionId, onSectionSelect, menuVisible, scrolled }: TMobileMenuProps) => {
  const pathname = usePathname();
  const handleLogout = useLogout();

  useLockBodyScroll(menuVisible);

  return (
    <div inert={!menuVisible} aria-hidden={!menuVisible}
      className={`menu-lateral fixed top-20 right-0 h-[calc(100dvh-5rem)] backdrop-blur-md ${scrolled ? "bg-[#f8dcc6]" : "bg-[#f8dcc6]/40" } w-64 transform ${menuVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-10000 flex flex-col border-l border-[#9F531B]/20`}
    >
      <nav className="flex flex-col flex-1 p-4 gap-4">
        {items.map((item) => {
          const isActive =
            item.kind === "link"
              ? isLinkActive(pathname, item.to)
              : item.kind === "section" && activeSectionId === item.sectionId;

          const className = `relative py-2 text-base transition-colors duration-300 cursor-pointer text-left
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
            after:bg-[#9F531B] after:transition-all after:duration-300 hover:after:w-20
            ${isActive ? "text-[#9F531B] after:w-20" : "text-[#1A1615] hover:text-[#9F531B]"}`;

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

      <div className="p-4 border-t border-[#9F531B]/30 flex items-center justify-between gap-4">
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#1A1615]/75">
          Síguenos
        </p>
        <SocialLinks />
      </div>
    </div>
  );
};
