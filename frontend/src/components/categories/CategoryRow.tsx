"use client";

import { FaPenToSquare, FaTrash } from "react-icons/fa6";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ModalTrigger } from "@/components/ui/ModalTrigger";
import { TCategory } from "@/schemas/category/category.schemas";
import { iconButton, iconButtonDanger } from "@/utils/styles/button";

export type TCategoryRowProps = {
  category: TCategory;
  deleteLoading: boolean;
  onStartEditing: () => void;
  onDelete: () => Promise<void>;
};

export const CategoryRow = ({ category, deleteLoading, onStartEditing, onDelete }: TCategoryRowProps) => {
  const productCount = category.productCount ?? 0;

  return (
    <div className="flex items-center gap-4 px-4 py-4 hover:bg-[#9F531B]/5 transition-colors duration-300">
      <div className="min-w-0 grow">
        <h3 className="truncate text-[#9F531B] font-medium text-base lg:text-lg">
          {category.name}
        </h3>

        <span className="text-[#1A1615]/75 text-xs lg:text-sm">
          {productCount === 1 ? "1 producto" : `${productCount} productos`}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onStartEditing}
          className={iconButton}
          title={`Editar ${category.name}`}
          aria-label={`Editar ${category.name}`}
        >
          <FaPenToSquare className="h-4 w-4 lg:h-4.5 lg:w-4.5" aria-hidden="true" />
        </button>

        <ModalTrigger
          renderTrigger={(onOpen) => (
            <button
              type="button"
              onClick={onOpen}
              className={iconButtonDanger}
              title={`Eliminar ${category.name}`}
              aria-label={`Eliminar ${category.name}`}
            >
              <FaTrash className="h-4 w-4 lg:h-4.5 lg:w-4.5" aria-hidden="true" />
            </button>
          )}
        >
          {(onClose, isOpen) => (
            <ConfirmationModal
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={async () => {
                await onDelete();
                onClose();
              }}
              loading={deleteLoading}
              title={`¿Realmente quieres eliminar "${category.name}"?`}
              context={
                productCount === 0
                  ? "Esta categoría no tiene productos, así que solo se elimina la categoría."
                  : `Si eliminas la categoría se eliminarán ${productCount} productos.`
              }
            />
          )}
        </ModalTrigger>
      </div>
    </div>
  );
};
