"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaBagShopping } from "react-icons/fa6";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { TOrderItem } from "@/schemas/order/order.schemas";
import { GlobalImage } from "@/utils/constants";
import { primaryButton, secondaryButton } from "@/utils/styles/button";

export type TModalAddOrderProps = {
  isOpen: boolean;
  onClose: () => void;
  order: TOrderItem;
};

export const ModalAddOrder = ({ isOpen, onClose, order }: TModalAddOrderProps) => {
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-4 backdrop-blur-sm bg-black/5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-order-modal-title"
        className="max-w-xl w-full bg-[#FFF9F5] rounded-lg shadow-lg p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col text-center">
          <h3 id="add-order-modal-title" className="text-[#9F531B] font-semibold text-lg lg:text-xl mb-4">
            ¡Producto agregado!
          </h3>

          <p className="text-[#1A1615]/75 text-sm lg:text-base mb-4">
            Tu producto se agregó correctamente. Puedes seguir comprando o ir a revisar tu pedido.
          </p>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-4">
            <div className="w-4/5 md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-48 bg-white rounded-xl shadow-sm border border-[#9F531B] overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${GlobalImage.url}/${order.ProductImage}`}
                  alt={order.ProductName}
                  loading="lazy"
                  width={400}
                  height={300}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
              <h4 className="text-[#9F531B] font-semibold text-left text-base lg:text-lg mb-2">
                {order.ProductName} ({order.ProductKey})
              </h4>

              <div className="space-y-2 mb-2">
                <div className="flex items-center gap-2 text-sm lg:text-base">
                  <span className="text-[#9F531B]">Color Seleccionado:</span>
                  <span className="font-medium text-[#1A1615]/75">{order.ProductColor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm lg:text-base">
                  <span className="text-[#9F531B]">Cantidad Agregada:</span>
                  <span className="font-medium text-[#1A1615]/75">{order.OrderQuantity}</span>
                </div>
              </div>

              {/* TODO: el subtotal de Agendas necesita el precio, que ProductSchema todavía no trae */}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              className={`${secondaryButton} gap-2 w-full sm:w-1/2 cursor-pointer`}
              onClick={onClose}
            >
              <FaArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              Seguir comprando
            </button>

            <Link href="/pedido" className={`${primaryButton} gap-2 w-full sm:w-1/2`}>
              <FaBagShopping className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              Ver mi pedido
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
