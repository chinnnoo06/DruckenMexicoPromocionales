"use client";

import { useEffect } from "react";

import { useCatalogOriginStore } from "@/store/catalogOriginStore";

/** Frames que esperamos a que la tarjeta exista antes de rendirnos. */
const MAX_ATTEMPTS = 20;

/**
 * Al volver desde una ficha, baja hasta la tarjeta del producto que se estaba viendo.
 * El navegador ya restaura el scroll solo con atrás/adelante; esto cubre volver por el
 * breadcrumb, que para Next es una navegación nueva.
 */
export const ScrollToProduct = () => {
  useEffect(() => {
    // Lectura no reactiva: solo interesa el origen que había al montar. Si lo leyéramos con
    // el selector, guardar un origen nuevo (al abrir otra ficha) volvería a disparar esto.
    const { origin, clearOrigin } = useCatalogOriginStore.getState();

    if (!origin) return;

    let frame = 0;
    let attempts = 0;

    const scrollToCard = () => {
      const card = document.querySelector(`[data-product-id="${origin.productId}"]`);

      // La grilla puede tardar un par de frames en estar pintada
      if (!card && attempts++ < MAX_ATTEMPTS) {
        frame = requestAnimationFrame(scrollToCard);
        return;
      }

      // Sin tarjeta (otra categoría, búsqueda activa) nos quedamos arriba, como cualquier página
      if (card) {
        card.scrollIntoView({ behavior: "auto", block: "center" });
      } else {
        window.scrollTo(0, 0);
      }

      clearOrigin();
    };

    frame = requestAnimationFrame(scrollToCard);

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
};
