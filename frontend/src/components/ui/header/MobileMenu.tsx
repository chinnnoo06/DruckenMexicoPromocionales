"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";

import type { TSectionId } from "@/hooks/useHeaderFooter";
import { useLogout } from "@/hooks/useLogout";
import { isLinkActive, type TNavItem } from "@/utils/navigation";
import { SocialLinks } from "../SocialLinks";

export type TMobileMenuProps = {
  items: TNavItem[];
  activeSectionId: TSectionId | null;
  onSectionSelect: (sectionId: TSectionId) => void;
  menuVisible: boolean;
  onToggleMenu: () => void;
};

export const MobileMenu = ({
  items,
  activeSectionId,
  onSectionSelect,
  menuVisible,
  onToggleMenu,
}: TMobileMenuProps) => {
  const pathname = usePathname();
  const handleLogout = useLogout();

  return (
    <div inert={!menuVisible} aria-hidden={!menuVisible}
      className={`menu-lateral fixed top-0 right-0 h-screen bg-[#f8dcc6] w-64 transform ${menuVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-10000 flex flex-col`}
    >
      <div className="flex items-center p-4 border-b border-[#9F531B]/30 bg-white/5 backdrop-blur-sm">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label="Cerrar menú de navegación"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg
            border border-[#9F531B]/30
            text-[#9F531B]
            hover:bg-linear-to-r hover:from-[#9F531B] hover:to-[#7C3E13]
            hover:text-white
            hover:border-transparent
            hover:shadow-md
            active:scale-95
            transition-all duration-300
            group"
        >
          <FaTimes
            className="h-4 w-4 lg:h-5 lg:w-5 transition-transform duration-300 group-hover:rotate-180"
            aria-hidden="true"
          />
        </button>
      </div>

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

      <div className="p-4">
        <SocialLinks />
      </div>
    </div>
  );
};
