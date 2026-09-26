"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";

import { useCategory } from "@/hooks/useCategory";
import { CATEGORIES_QUERY_KEY } from "@/hooks/useGetCategories";
import { TCategoryForm } from "@/schemas/category/category.form.schemas";
import { TCategory } from "@/schemas/category/category.schemas";
import { primaryButton } from "@/utils/styles/button";
import { MapCategories, NEW_CATEGORY_ID } from "./MapCategories";

export type TCategoriesPanelProps = {
  categories: TCategory[];
  totalProducts: number;
};

export const CategoriesPanel = ({ categories, totalProducts }: TCategoriesPanelProps) => {
  /** NEW_CATEGORY_ID para la fila de agregar, un _id para editar esa fila, null si no hay ninguna abierta. */
  const [editingId, setEditingId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { addCategory, updateCategory, deleteCategory } = useCategory();

  useEffect(() => {
    if (addCategory.error) toast.error(addCategory.error);
  }, [addCategory.error]);

  useEffect(() => {
    if (addCategory.success) toast.success(addCategory.success);
  }, [addCategory.success]);

  useEffect(() => {
    if (updateCategory.error) toast.error(updateCategory.error);
  }, [updateCategory.error]);

  useEffect(() => {
    if (updateCategory.success) toast.success(updateCategory.success);
  }, [updateCategory.success]);

  useEffect(() => {
    if (deleteCategory.error) toast.error(deleteCategory.error);
  }, [deleteCategory.error]);

  useEffect(() => {
    if (deleteCategory.success) toast.success(deleteCategory.success);
  }, [deleteCategory.success]);

  /** El desplegable del catálogo y el select del formulario de producto leen de React Query, no del servidor. */
  const refreshCategories = () => queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });

  /** La misma fila sirve para agregar y para editar, así que editingId decide qué acción toca. */
  const handleSave = async (data: TCategoryForm) => {
    if (editingId === NEW_CATEGORY_ID) {
      await addCategory.handleAddCategory(data);
    } else if (editingId) {
      await updateCategory.handleUpdateCategory(editingId, data);
    }

    setEditingId(null);
    refreshCategories();
  };

  const handleDelete = async (_id: TCategory["_id"]) => {
    await deleteCategory.handleDeleteCategory(_id);
    refreshCategories();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <span className="text-[#1A1615]/75 text-sm lg:text-base font-medium">
          {categories.length === 1 ? "1 categoría" : `${categories.length} categorías`}
          {" · "}
          {totalProducts === 1 ? "1 producto" : `${totalProducts} productos`}
        </span>

        <button
          type="button"
          onClick={() => setEditingId(NEW_CATEGORY_ID)}
          disabled={editingId === NEW_CATEGORY_ID}
          className={`${primaryButton} gap-2 cursor-pointer`}
        >
          <FaPlus className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          Agregar categoría
        </button>
      </div>

      <MapCategories
        categories={categories}
        editingId={editingId}
        saveLoading={addCategory.loading || updateCategory.loading}
        deleteLoading={deleteCategory.loading}
        onStartEditing={(_id) => setEditingId(_id)}
        onCancel={() => setEditingId(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};
