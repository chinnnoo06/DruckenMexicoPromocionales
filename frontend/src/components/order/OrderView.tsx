"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { FaBagShopping } from "react-icons/fa6";

import { MapOrder } from "@/components/order/MapOrder";
import { OrderSummary } from "@/components/order/OrderSummary";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { groupOrderItems, useOrderStore } from "@/store/orderStore";
import { primaryButton } from "@/utils/styles/button";

export const OrderView = () => {
  const items = useOrderStore((state) => state.items);
  const hasHydrated = useOrderStore((state) => state.hasHydrated);
  const setHydrated = useOrderStore((state) => state.setHydrated);

  useEffect(() => setHydrated(), [setHydrated]);

  const groups = useMemo(() => groupOrderItems(items), [items]);

  if (!hasHydrated) return <LoadingSpinner />;

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <FaBagShopping
          className="h-12 w-12 lg:h-14 lg:w-14 mb-2 text-[#9F531B]"
          aria-hidden="true"
        />

        <h3 className="text-[#9F531B] font-medium text-base lg:text-lg mb-2">
          Tu pedido está vacío
        </h3>
        <p className="text-[#1A1615]/75 max-w-md mx-auto text-sm lg:text-base mb-4">
          Parece que no has agregado ningún producto a tu carrito todavía.
        </p>

        <Link href="/catalogo/todos/1" className={primaryButton}>
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <MapOrder groups={groups} />

      <OrderSummary groups={groups} />
    </div>
  );
};
