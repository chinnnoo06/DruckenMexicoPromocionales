"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const SECTION_IDS = ["inicio", "nosotros", "servicios", "contacto"] as const;

export type TSectionId = (typeof SECTION_IDS)[number];

export type TUseHeaderFooterReturn = {
  scrollToSection: (sectionId: TSectionId) => void;
  navigateToSection: (sectionId: TSectionId) => void;
  toggleMenu: () => void;
  menuVisible: boolean;
  activeSection: TSectionId;
  scrolled: boolean;
  isInicio: boolean;
};

export const useHeaderFooter = (offset = 80): TUseHeaderFooterReturn => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<TSectionId>("inicio");
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isInicio = pathname === "/"

  // Cierra el menú lateral al cambiar de ruta
  useEffect(() => {
    setMenuVisible(false);
  }, [pathname]);

  // Marca la sección activa mientras se hace scroll en el inicio
  useEffect(() => {
    if (!isInicio) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTION_IDS[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInicio, offset]);

  // Opacidad de la barra según el scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // A partir de lg el menú lateral no aplica
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * En el inicio no navegamos: hacemos el scroll a mano para conservar el suave y el offset
   * del header fijo. Pero sí sincronizamos el hash con replaceState, para que la URL siempre
   * diga en qué sección estás en vez de quedarse con la que traías al llegar.
   */
  const scrollToSection = useCallback(
    (sectionId: TSectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setMenuVisible(false);

      window.history.replaceState(null, "", `#${sectionId}`);
    },
    [offset],
  );

  /** Fuera del inicio la sección viaja en el hash; <ScrollToHash /> hace el scroll al montar. */
  const navigateToSection = useCallback(
    (sectionId: TSectionId) => {
      setMenuVisible(false);
      router.push(`/#${sectionId}`);
    },
    [router],
  );

  const toggleMenu = useCallback(() => {
    setMenuVisible((visible) => !visible);
  }, []);

  return {
    scrollToSection,
    navigateToSection,
    toggleMenu,
    menuVisible,
    activeSection,
    scrolled,
    isInicio,
  };
};
