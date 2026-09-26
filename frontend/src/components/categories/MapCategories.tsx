"use client";

import { FaCircleExclamation } from "react-icons/fa6";

import { TCategoryForm } from "@/schemas/category/category.form.schemas";
import { TCategory } from "@/schemas/category/category.schemas";
import { CategoryForm } from "./CategoryForm";
import { CategoryRow } from "./CategoryRow";

/** Se usa como editingId cuando la fila abierta es la de agregar. */
export const NEW_CATEGORY_ID = "new";

export type TMapCategoriesProps = {
  categories: TCategory[];
  /** NEW_CATEGORY_ID, el _id de la categoría que se edita, o null si no hay ninguna abierta. */
  editingId: string | null;
  saveLoading: boolean;
  deleteLoading: boolean;
  onStartEditing: (_id: TCategory["_id"]) => void;
  onCancel: () => void;
  onSave: (data: TCategoryForm) => void;
  onDelete: (_id: TCategory["_id"]) => Promise<void>;
};

export const MapCategories = ({ categories, editingId, saveLoading, deleteLoading, onStartEditing, onCancel, onSave, onDelete }: TMapCategoriesProps) => {
  const isAdding = editingId === NEW_CATEGORY_ID;

  return (
    <div className="rounded-lg border border-[#9F531B]/25 bg-white/50 shadow-lg overflow-hidden divide-y divide-[#9F531B]/15">
      {isAdding && (
        <CategoryForm loading={saveLoading} onSave={onSave} onCancel={onCancel} />
      )}

      {categories.length === 0 && !isAdding ? (
        <div className="flex flex-col justify-center items-center h-52 text-[#9F531B]">
          <FaCircleExclamation className="h-12 w-12 lg:h-14 lg:w-14 mb-2" aria-hidden="true" />
          <h3 className="font-medium text-base lg:text-lg">No hay categorías registradas</h3>
        </div>
      ) : (
        categories.map((category) =>
          editingId === category._id ? (
            <CategoryForm
              key={category._id}
              defaultName={category.name}
              loading={saveLoading}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <CategoryRow
              key={category._id}
              category={category}
              deleteLoading={deleteLoading}
              onStartEditing={() => onStartEditing(category._id)}
              onDelete={() => onDelete(category._id)}
            />
          ),
        )
      )}
    </div>
  );
};
