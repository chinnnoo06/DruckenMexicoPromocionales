"use client"

import { useFieldArray, useWatch, type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue } from "react-hook-form"
import { FaChevronDown, FaCircleExclamation, FaPlus, FaTrash } from 'react-icons/fa6'

import { useGetCategories } from '@/hooks/useGetCategories'
import { TProductForm } from '@/schemas/product/product.form.schemas'
import { primaryButton } from '@/utils/styles/button'
import { errorSpan, input, label, select } from '@/utils/styles/form'

type TProductFormProps = {
    register: UseFormRegister<TProductForm>
    errors: FieldErrors<TProductForm>
    control: Control<TProductForm>
    setValue: UseFormSetValue<TProductForm>
}

export const ProductForm = ({ register, errors, control, setValue }: TProductFormProps) => {
    const { data: categories } = useGetCategories()

    const { fields, append, remove } = useFieldArray({ control, name: 'colors' })

    const colors = useWatch({ control, name: 'colors' })
    const generalImage = useWatch({ control, name: 'generalImage' })

    const hasSeveralColors = fields.length > 1

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-8">
                <div className="form-group flex-1">
                    <label htmlFor="name" className={label}>Nombre </label>
                    <input type="text" id="name" autoComplete="off" {...register("name")} placeholder="Ingresa el nombre" className={input} />

                    {errors.name &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.name.message}
                        </span>
                    }
                </div>

                <div className="form-group flex-1">
                    <label htmlFor="key" className={label}>Clave </label>
                    <input type="text" id="key" autoComplete="off" {...register("key")} placeholder="Ingresa la clave" className={input} />

                    {errors.key &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.key.message}
                        </span>
                    }
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description" className={label}>Descripción </label>
                <textarea id="description" rows={5} autoComplete="off" {...register("description")} placeholder="Ingresa la descripción del producto..." className={`${input} resize-none`} />

                {errors.description &&
                    <span className={errorSpan}>
                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                        {errors.description.message}
                    </span>
                }
            </div>

            <div className="form-group">
                <label htmlFor="printingTechnique" className={label}>Técnica(s) de Impresión </label>
                <input type="text" id="printingTechnique" autoComplete="off" {...register("printingTechnique")} placeholder="Ingresa la(s) técnica(s) de impresión" className={input} />

                {errors.printingTechnique &&
                    <span className={errorSpan}>
                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                        {errors.printingTechnique.message}
                    </span>
                }
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
                <div className="form-group flex-1">
                    <label htmlFor="category" className={label}>Categoría </label>

                    <div className="relative">
                        <select id="category" {...register("category")} className={select}>
                            <option value="">Selecciona una</option>

                            {(categories ?? []).map((category) => (
                                <option key={category.name} value={category.name}>{category.name}</option>
                            ))}
                        </select>

                        <FaChevronDown className="pointer-events-none absolute inset-y-0 right-3 my-auto h-3 w-3 text-[#9F531B]" aria-hidden="true" />
                    </div>

                    {errors.category &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.category.message}
                        </span>
                    }
                </div>

                <div className="form-group flex-1">
                    <label htmlFor="material" className={label}>Material </label>
                    <input type="text" id="material" autoComplete="off" {...register("material")} placeholder="Ingresa el material" className={input} />

                    {errors.material &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.material.message}
                        </span>
                    }
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
                <div className="form-group flex-1">
                    <label htmlFor="measures" className={label}>Medidas </label>
                    <input type="text" id="measures" autoComplete="off" {...register("measures")} placeholder="Ingresa las medidas del producto" className={input} />

                    {errors.measures &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.measures.message}
                        </span>
                    }
                </div>

                <div className="form-group flex-1">
                    <label htmlFor="printingMeasures" className={label}>Medidas de Impresión </label>
                    <input type="text" id="printingMeasures" autoComplete="off" {...register("printingMeasures")} placeholder="Ingresa las medidas de impresión" className={input} />

                    {errors.printingMeasures &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.printingMeasures.message}
                        </span>
                    }
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="minQuantity" className={label}>Cantidad Mínima </label>
                <input type="number" id="minQuantity" min={1} autoComplete="off" {...register("minQuantity", { valueAsNumber: true })} placeholder="Ingresa la cantidad mínima" className={input} />

                {errors.minQuantity &&
                    <span className={errorSpan}>
                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                        {errors.minQuantity.message}
                    </span>
                }
            </div>

            <div className="form-group">
                <div className="flex justify-between items-center">
                    <span className={label}>Colores del Producto </span>

                    <button
                        type="button"
                        onClick={() => append({ color: '', hex: '', image: undefined as unknown as File })}
                        className={`${primaryButton} gap-2 text-xs! cursor-pointer`}
                    >
                        <FaPlus className="w-3 h-3 lg:w-3.5 lg:h-3.5" aria-hidden="true" />
                        Agregar
                    </button>
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="mt-4 p-4 rounded-lg border border-[#9F531B]/25 bg-[#9F531B]/5">
                        <div className="flex justify-between items-center mb-4">
                            <span className={`${label} mb-0`}>Color {index + 1} </span>

                            {hasSeveralColors &&
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    aria-label={`Eliminar color ${index + 1}`}
                                    className="flex items-center gap-1 text-[10px] lg:text-xs text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <FaTrash className="w-3 h-3 lg:w-3.5 lg:h-3.5" aria-hidden="true" />
                                    Eliminar
                                </button>
                            }
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="form-group">
                                <label htmlFor={`colors.${index}.color`} className={label}>Nombre del Color </label>
                                <input type="text" id={`colors.${index}.color`} autoComplete="off" {...register(`colors.${index}.color`)} placeholder="Ej: Blanco" className={input} />

                                {errors.colors?.[index]?.color &&
                                    <span className={errorSpan}>
                                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                                        {errors.colors[index].color.message}
                                    </span>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor={`colors.${index}.hex`} className={label}>Código HEX </label>

                                <div className="flex items-center gap-2">
                                    <input type="text" id={`colors.${index}.hex`} autoComplete="off" {...register(`colors.${index}.hex`)} placeholder="#FFFFFF" className={input} />

                                    {colors?.[index]?.hex &&
                                        <span
                                            className="w-8 h-8 shrink-0 rounded border border-[#9F531B]/25"
                                            style={{ backgroundColor: colors[index].hex }}
                                            title="Previsualización del color"
                                        />
                                    }
                                </div>

                                {errors.colors?.[index]?.hex &&
                                    <span className={errorSpan}>
                                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                                        {errors.colors[index].hex.message}
                                    </span>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor={`colors.${index}.image`} className={label}>Imagen </label>
                                <input
                                    type="file"
                                    id={`colors.${index}.image`}
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) => setValue(`colors.${index}.image`, event.target.files?.[0] as File, { shouldValidate: true })}
                                    className={input}
                                />

                                {colors?.[index]?.image &&
                                    <p className="mt-2 text-[10px] lg:text-xs text-[#1A1615]/75">
                                        Archivo actual: <span className="font-medium">{colors[index].image.name}</span>
                                    </p>
                                }

                                {errors.colors?.[index]?.image &&
                                    <span className={errorSpan}>
                                        <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                                        {errors.colors[index].image.message}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasSeveralColors &&
                <div className="form-group">
                    <label htmlFor="generalImage" className={label}>Imagen General de Todos los Colores </label>
                    <input
                        type="file"
                        id="generalImage"
                        accept=".jpg, .jpeg, .png"
                        onChange={(event) => setValue("generalImage", event.target.files?.[0], { shouldValidate: true })}
                        className={input}
                    />

                    {generalImage &&
                        <p className="mt-2 text-[10px] lg:text-xs text-[#1A1615]/75">
                            Archivo actual: <span className="font-medium">{generalImage.name}</span>
                        </p>
                    }

                    {errors.generalImage &&
                        <span className={errorSpan}>
                            <FaCircleExclamation className="inline-block h-4 w-4 lg:h-5 lg:w-5 mr-1" />
                            {errors.generalImage.message}
                        </span>
                    }
                </div>
            }
        </>
    )
}
