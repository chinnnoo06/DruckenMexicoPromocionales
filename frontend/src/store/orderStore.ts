import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TOrderItem } from "@/schemas/order/order.schemas";

export type TOrderGroup = {
  ProductId: string;
  ProductName: string;
  ProductKey: string;
  ProductMinQuantity: number;
  items: TOrderItem[];
  totalQuantity: number;
};

type TOrderState = {
  items: TOrderItem[];
  hasHydrated: boolean;
  setHydrated: () => void;
  addItem: (item: TOrderItem) => void;
  increaseQuantity: (id: TOrderItem["ProductId"], color: TOrderItem["ProductColor"]) => void;
  decreaseQuantity: (id: TOrderItem["ProductId"], color: TOrderItem["ProductColor"]) => void;
  removeItem: (id: TOrderItem["ProductId"], color: TOrderItem["ProductColor"]) => void;
  clearOrder: () => void;
};

/** Producto + color identifican una línea del pedido. */
const isSameLine = (item: TOrderItem, id: string, color: string) =>
  item.ProductId === id && item.ProductColor === color;

const addQuantity = (items: TOrderItem[], id: string, color: string, amount: number) =>
  items.map((item) =>
    isSameLine(item, id, color)
      ? { ...item, OrderQuantity: Math.max(1, item.OrderQuantity + amount) }
      : item,
  );

export const useOrderStore = create<TOrderState>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,

      // Lo llama /pedido al montar; hasta entonces no sabemos si el pedido está vacío
      setHydrated: () => set({ hasHydrated: true }),

      // Mismo producto y mismo color son la misma línea: se suman las cantidades
      addItem: (item) =>
        set((state) =>
          state.items.some((current) => isSameLine(current, item.ProductId, item.ProductColor))
            ? { items: addQuantity(state.items, item.ProductId, item.ProductColor, item.OrderQuantity) }
            : { items: [...state.items, item] },
        ),

      increaseQuantity: (id, color) =>
        set((state) => ({ items: addQuantity(state.items, id, color, 1) })),

      decreaseQuantity: (id, color) =>
        set((state) => ({ items: addQuantity(state.items, id, color, -1) })),

      removeItem: (id, color) =>
        set((state) => ({ items: state.items.filter((item) => !isSameLine(item, id, color)) })),

      clearOrder: () => set({ items: [] }),
    }),
    {
      name: "drucken:order",
      // Solo el pedido se guarda; hasHydrated es de esta sesión
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const groupOrderItems = (items: TOrderItem[]): TOrderGroup[] => {
  const groups = new Map<string, TOrderGroup>();

  for (const item of items) {
    const group = groups.get(item.ProductId);

    if (group) {
      group.items.push(item);
      group.totalQuantity += item.OrderQuantity;
      continue;
    }

    groups.set(item.ProductId, {
      ProductId: item.ProductId,
      ProductName: item.ProductName,
      ProductKey: item.ProductKey,
      ProductMinQuantity: item.ProductMinQuantity,
      items: [item],
      totalQuantity: item.OrderQuantity,
    });
  }

  return [...groups.values()];
};
