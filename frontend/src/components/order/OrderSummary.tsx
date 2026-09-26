"use client";

import Link from "next/link";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa6";

import { TOrderGroup, useOrderStore } from "@/store/orderStore";
import { GlobalImage, WHATSAPP_NUMBER } from "@/utils/constants";
import { primaryButton, secondaryButton } from "@/utils/styles/button";

const buildMessage = (groups: TOrderGroup[]) => {
  const title = "*COTIZACIÓN DE PEDIDO - DRUCKEN MÉXICO PROMOCIONALES*";
  const greeting =
    "Hola, visité el sitio web de *Drucken México Promocionales* y me interesan los siguientes productos:\n";

  const body = groups
    .map((group) => {
      const lines = group.items
        .map(
          (item) =>
            `*Color:* ${item.ProductColor}\n` +
            `    Cantidad: ${item.OrderQuantity} pzs\n` +
            `    *Imagen del producto:* ${item.ProductImage ? `${GlobalImage.url}/${item.ProductImage}` : "No disponible"}\n`,
        )
        .join("\n");

      return `\n═════════════════════\n*${group.ProductName}* (${group.ProductKey})\nCantidad total: *${group.totalQuantity} pzs*\n\n${lines}`;
    })
    .join("");

  return (
    `${title}\n\n${greeting}${body}\n═════════════════════\n\n` +
    "*Nota:* Cantidades sujetas a confirmación.\n" +
    "*Nota:* Los precios se proporcionarán en la cotización directamente por mensaje.\n"
  );
};

export const OrderSummary = ({ groups }: { groups: TOrderGroup[] }) => {
  const clearOrder = useOrderStore((state) => state.clearOrder);

  const itemCount = groups.reduce((total, group) => total + group.items.length, 0);

  const isBelowMinimum = groups.some((group) => group.totalQuantity < group.ProductMinQuantity);

  const sendOrder = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(groups))}`;

    window.open(url, "_blank", "noopener,noreferrer");
    
    clearOrder()
  };

  return (
    <div className="flex flex-col flex-[30%] h-fit bg-linear-to-br from-[#9F531B]/5 to-[#7C3E13]/10 p-4 rounded-xl border border-[#9F531B]/20 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <h3 className="text-lg lg:text-xl font-semibold text-[#9F531B] border-b pb-2 border-[#9F531B]/20">
            Resumen del pedido
          </h3>

          <div className="flex justify-between items-center text-sm lg:text-base text-[#1A1615]/75">
            <span>Productos:</span>
            <span className="font-medium">{itemCount}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <button
              type="button"
              className={`${primaryButton} gap-2 cursor-pointer`}
              disabled={isBelowMinimum}
              onClick={sendOrder}
            >
              <FaWhatsapp className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              Realizar Pedido
            </button>

            {isBelowMinimum && (
              <p className="text-[10px] lg:text-xs text-red-500 mt-1">
                * Uno o más productos no cumplen con la cantidad mínima de pedido
              </p>
            )}
          </div>

          <Link href="/catalogo/todos/1" className={`${secondaryButton} gap-2`}>
            <FaArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
            Comprar Más
          </Link>
        </div>

        <p className="text-[10px] lg:text-xs text-[#9F531B]/70 text-center">
          * Los precios se proporcionarán en la cotización directamente por mensaje
        </p>
      </div>
    </div>
  );
};
