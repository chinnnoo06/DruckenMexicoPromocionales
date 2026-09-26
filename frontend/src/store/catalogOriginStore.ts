import { create } from "zustand";

type TCatalogOrigin = {
  category: string;
  page: number;
  productId: string;
};

type TCatalogOriginState = {
  origin: TCatalogOrigin | null;
  setOrigin: (origin: TCatalogOrigin) => void;
  clearOrigin: () => void;
};

export const useCatalogOriginStore = create<TCatalogOriginState>()((set) => ({
  origin: null,
  setOrigin: (origin) => set({ origin }),
  clearOrigin: () => set({ origin: null }),
}));
