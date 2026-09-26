"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaBagShopping, FaPenToSquare, FaTrash } from "react-icons/fa6";

import { QuantityButtons } from "@/components/order/QuantityButtons";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ModalTrigger } from "@/components/ui/ModalTrigger";
import { useProduct } from "@/hooks/useProduct";
import { TOrderItem } from "@/schemas/order/order.schemas";
import { TProduct } from "@/schemas/product/product.schemas";
import { useOrderStore } from "@/store/orderStore";
import { primaryButton, secondaryButton } from "@/utils/styles/button";
import { ModalAddOrder } from "./ModalAddOrder";

export type TInfoProductProps = {
  product: TProduct;
  selectedColor: number;
  setSelectedColor: (index: number) => void;
  isAdmin?: boolean;
};

export const InfoProduct = ({ product, selectedColor, setSelectedColor, isAdmin = false }: TInfoProductProps) => {
  const [quantity, setQuantity] = useState(product.minQuantity);

  const router = useRouter();

  const addItem = useOrderStore((state) => state.addItem);

  const { deleteProduct } = useProduct();

  useEffect(() => {
    if (deleteProduct.error) toast.error(deleteProduct.error);
  }, [deleteProduct.error]);

  useEffect(() => {
    if (deleteProduct.success) {
      toast.success(deleteProduct.success);
      router.push("/admin/catalogo/todos/1");
    }
  }, [deleteProduct.success, router]);

  const color = product.colors[selectedColor];

  const order: TOrderItem = {
    ProductId: product._id,
    ProductName: product.name,
    ProductKey: product.key,
    ProductCategory: product.category,
    ProductColor: color.color,
    ProductHexColor: color.hex,
    ProductImage: color.image ?? product.generalImage ?? "",
    ProductMinQuantity: product.minQuantity,
    OrderQuantity: quantity,
  };

  const fields = [
    { label: "Categoría", value: product.category },
    { label: "Material", value: product.material },
    { label: "Técnica de impresión", value: product.printingTechnique },
    { label: "Medidas", value: product.measures },
    { label: "Medidas de impresión", value: product.printingMeasures },
  ];

  return (
    <div className="lg:w-3/5 w-full flex flex-col justify-center">
      <h3 className="text-[#9F531B] font-semibold text-xl lg:text-2xl mb-4">
        {product.name} ({product.key})
      </h3>

      <span className="text-[#1A1615]/75 text-xs lg:text-base block mb-4 whitespace-pre-line">
        {product.description}
      </span>

      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.label} className="flex flex-col">
              <span className="text-[#7C3E13] text-sm lg:text-base font-medium mb-2">{field.label}</span>
              <span className="text-[#1A1615]/75 text-xs lg:text-sm">{field.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-[#7C3E13] text-sm lg:text-base font-medium mb-2">Colores disponibles</h4>
        <div className="flex flex-wrap gap-4">
          {product.colors.map((color, index) => (
            <div className="flex flex-col gap-2 items-center" key={`${color.color}-${index}`}>
              <button
                type="button"
                onClick={() => setSelectedColor(index)}
                className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center
                  ${selectedColor === index ? "border-[#7C3E13]/50 scale-110" : "border-gray-200 hover:border-gray-300"}`}
                style={{ backgroundColor: color.hex || "#ccc" }}
                aria-label={`Seleccionar color ${color.color}`}
                aria-pressed={selectedColor === index}
                title={color.color}
              />
              <span className="text-[#1A1615]/75 text-[10px] lg:text-xs">{color.color}</span>
            </div>
          ))}
        </div>
      </div>

      {isAdmin ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/admin/producto/${product._id}/editar`}
            className={`${primaryButton} gap-2 w-full sm:w-1/2`}
          >
            <FaPenToSquare className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
            Editar producto
          </Link>

          <ModalTrigger
            renderTrigger={(onOpen) => (
              <button
                type="button"
                onClick={onOpen}
                className={`${secondaryButton} gap-2 w-full sm:w-1/2 cursor-pointer`}
              >
                <FaTrash className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                Eliminar producto
              </button>
            )}
          >
            {(onClose, isOpen) => (
              <ConfirmationModal
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={async () => {
                  await deleteProduct.handleDeleteProduct(product._id);
                  onClose();
                }}
                loading={deleteProduct.loading}
                title="¿Realmente quieres eliminar este producto?"
                context="Esta acción no se puede revertir, y los usuarios no podrán ver más este producto en el catálogo."
              />
            )}
          </ModalTrigger>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <span className="block text-[#7C3E13] text-sm lg:text-base font-medium mb-2">
              Cantidad
            </span>
            <QuantityButtons
              quantity={quantity}
              increaseQuantity={() => setQuantity((current) => current + 1)}
              decreaseQuantity={() =>
                setQuantity((current) => Math.max(product.minQuantity, current - 1))
              }
              min={product.minQuantity}
            />
          </div>

          <ModalTrigger
            renderTrigger={(onOpen) => (
              <button
                type="button"
                className={`${primaryButton} gap-2 cursor-pointer`}
                onClick={() => {
                  addItem(order);
                  onOpen();
                }}
              >
                <FaBagShopping className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
                Agregar al pedido
              </button>
            )}
          >
            {(onClose, isOpen) => <ModalAddOrder isOpen={isOpen} onClose={onClose} order={order} />}
          </ModalTrigger>
        </>
      )}
    </div>
  );
};
