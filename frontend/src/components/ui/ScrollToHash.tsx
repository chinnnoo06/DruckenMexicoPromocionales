"use client";

import { useEffect } from "react";

import { SECTION_IDS, TSectionId } from "@/hooks/useHeaderFooter";

const isSectionId = (value: string): value is TSectionId =>
  (SECTION_IDS as readonly string[]).includes(value);

export type TScrollToHashProps = {
  /** Alto del header fijo, para que la sección no quede debajo. */
  offset?: number;
};

/**
 * Al entrar al inicio con un hash (/#servicios) el navegador salta a la sección
 * sin descontar el header. Este componente rehace el scroll ya con el offset.
 */
export const ScrollToHash = ({ offset = 80 }: TScrollToHashProps) => {
  useEffect(() => {
    const sectionId = window.location.hash.slice(1);

    if (!isSectionId(sectionId)) return;

    // Un frame de margen para que el layout ya esté pintado al medir.
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });

    return () => cancelAnimationFrame(frame);
  }, [offset]);

  return null;
};
