"use client";

import { FaTrash } from "react-icons/fa6";

import { QuantityButtons } from "@/components/order/QuantityButtons";
import { TOrderGroup, useOrderStore } from "@/store/orderStore";
import { GlobalImage } from "@/utils/constants";

export type TOrderCartProps = {
  group: TOrderGroup;
};

export const OrderCart = ({ group }: TOrderCartProps) => {
  const increaseQuantity = useOrderStore((state) => state.increaseQuantity);
  const decreaseQuantity = useOrderStore((state) => state.decreaseQuantity);
  const removeItem = useOrderStore((state) => state.removeItem);

  const reachedMinimum = group.totalQuantity >= group.ProductMinQuantity;

  return (
    <div className="p-4 bg-linear-to-br from-[#9F531B]/5 to-[#7C3E13]/10 border border-[#9F531B]/25  transition-shadow duration-300 rounded-lg">
      <h3 className="font-semibold text-[#9F531B] text-lg lg:text-xl mb-3 w-full">
        {group.ProductName} ({group.ProductKey})
      </h3>

      <div className="space-y-4">
        {group.items.map((item) => (
          <div
            key={item.ProductColor}
            className="flex flex-col sm:flex-row gap-6 items-stretch"
          >
            <div className="w-full sm:w-30 h-40 sm:h-40 rounded-lg flex items-center justify-center mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${GlobalImage.url}/${item.ProductImage}`}
                alt={item.ProductName}
                loading="lazy"
                width={300}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center gap-10 pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-sm lg:text-base text-[#9F531B]">Color:</span>

                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full border border-gray-200"
                      style={{ backgroundColor: item.ProductHexColor || "#ccc" }}
                      aria-hidden="true"
                    />
                    <span className="text-sm lg:text-base text-[#1A1615]/75">
                      {item.ProductColor}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cursor-pointer"
                  aria-label={`Eliminar ${item.ProductName} en color ${item.ProductColor} del pedido`}
                  onClick={() => removeItem(item.ProductId, item.ProductColor)}
                >
                  <FaTrash
                    className="h-4 w-4 lg:h-5 lg:w-5 text-[#9F531B] hover:text-[#7C3E13]"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#9F531B]">
                <QuantityButtons
                  quantity={item.OrderQuantity}
                  decreaseQuantity={() => decreaseQuantity(item.ProductId, item.ProductColor)}
                  increaseQuantity={() => increaseQuantity(item.ProductId, item.ProductColor)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3">
        <p className="text-xs lg:text-sm text-[#1A1615]/75">
          Cantidad total seleccionada: <span className="font-semibold">{group.totalQuantity}</span>
        </p>
        <p className="text-xs lg:text-sm text-[#1A1615]/75">
          Cantidad mínima requerida:{" "}
          <span className="font-semibold">{group.ProductMinQuantity}</span>
        </p>

        {reachedMinimum ? (
          <p className="text-xs lg:text-sm text-green-600 mt-1">
            Has alcanzado la cantidad mínima de compra.
          </p>
        ) : (
          <p className="text-xs lg:text-sm text-red-500 mt-1">
            * Debes alcanzar al menos la cantidad mínima para este producto.
          </p>
        )}
      </div>
    </div>
  );
};
