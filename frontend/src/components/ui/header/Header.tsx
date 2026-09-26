"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";

import DruckenLogo from "@/assets/logodrucken.webp";
import { useHeaderFooter } from "@/hooks/useHeaderFooter";
import { useLogout } from "@/hooks/useLogout";
import { SocialLinks } from "../SocialLinks";
import { MobileMenu } from "./MobileMenu";
import { getNavItems, isLinkActive } from "@/utils/navigation";

export type THeaderProps = {
  isAdmin?: boolean;
};

export const Header = ({ isAdmin = false }: THeaderProps) => {
  const { scrollToSection, navigateToSection, toggleMenu, menuVisible, activeSection, scrolled, isInicio } = useHeaderFooter();

  const pathname = usePathname();
  const handleLogout = useLogout();

  const items = getNavItems(isAdmin, isInicio);

  const activeSectionId = isInicio ? activeSection : null;
  const onSectionSelect = isInicio ? scrollToSection : navigateToSection;

  return (
    <>
      <div className={`flex justify-center fixed top-0 inset-x-0 z-100 h-20 border-b border-[#9F531B]/20 backdrop-blur-md transition-colors duration-300 ${scrolled ? "bg-[#f8dcc6]" : "bg-[#f8dcc6]/40" }`}>
        <header className="max-w-[1600px] mx-auto w-full flex justify-between items-center gap-4 px-4 lg:px-8">
          <div className="flex items-center gap-5 lg:gap-10">
            <div className="logo transition-transform duration-300 hover:scale-105">
              <Link href="/" className="no-underline">
                <Image
                  src={DruckenLogo}
                  alt="Logo de Drucken México"
                  width={2512}
                  height={1518}
                  sizes="80px"
                  priority
                  className="h-10 lg:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            <nav className="hidden lg:flex gap-5 items-center">
              {items.map((item) => {
                const isActive =
                  item.kind === "link"
                    ? isLinkActive(pathname, item.to)
                    : item.kind === "section" && activeSectionId === item.sectionId;

                const className = `relative px-2 py-1 text-sm xl:text-base transition-colors duration-300 cursor-pointer
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
                  after:bg-[#9F531B] after:transition-all after:duration-300 hover:after:w-full
                  ${isActive ? "text-[#9F531B] after:w-full" : "text-[#1A1615] hover:text-[#9F531B]"}`;

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
          </div>

          <div className="hidden lg:flex">
            <SocialLinks />
          </div>

          <button
            type="button"
            className="nav-responsive flex lg:hidden items-center text-[#9F531B] cursor-pointer hover:text-[#9F531B]"
            onClick={toggleMenu}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuVisible}
          >
            <FaBars className="h-[1.45rem] w-[1.45rem]" aria-hidden="true" />
          </button>
        </header>
      </div>

      <MobileMenu
        items={items}
        activeSectionId={activeSectionId}
        onSectionSelect={onSectionSelect}
        menuVisible={menuVisible}
        onToggleMenu={toggleMenu}
      />
    </>
  );
};
