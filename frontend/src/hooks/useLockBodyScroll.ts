"use client";

import { useEffect } from "react";

export const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = previous;
    };
  }, [locked]);
};
