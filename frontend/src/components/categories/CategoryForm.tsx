"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCheck, FaCircleExclamation, FaXmark } from "react-icons/fa6";

import { CategoryFormSchema, TCategoryForm } from "@/schemas/category/category.form.schemas";
import { primaryButton, secondaryButton } from "@/utils/styles/button";
import { errorSpan, input } from "@/utils/styles/form";

export type TCategoryFormProps = {
  defaultName?: string;
  loading: boolean;
  onSave: (data: TCategoryForm) => void;
  onCancel: () => void;
};

export const CategoryForm = ({ defaultName = "", loading, onSave, onCancel }: TCategoryFormProps) => {
  const { register, handleSubmit, formState: { errors }} = useForm<TCategoryForm>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: { name: defaultName },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      noValidate
      className="flex flex-col sm:flex-row sm:items-start gap-4 px-4 py-4 bg-[#9F531B]/8"
    >
      <div className="grow">
        <label htmlFor="name" className="sr-only">
          Nombre de la categoría
        </label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          autoFocus
          {...register("name")}
          placeholder="Nombre de la categoría..."
          className={input}
        />

        {errors.name && (
          <span className={errorSpan}>
            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" aria-hidden="true" />
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          type="submit"
          disabled={loading}
          className={`${primaryButton} gap-2 w-full sm:w-auto cursor-pointer`}
        >
          <FaCheck className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          {loading ? "Guardando..." : "Guardar"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className={`${secondaryButton} gap-2 w-full sm:w-auto cursor-pointer`}
        >
          <FaXmark className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          Cancelar
        </button>
      </div>
    </form>
  );
};
