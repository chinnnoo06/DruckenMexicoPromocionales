"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "react-toastify"
import { FaPencil } from 'react-icons/fa6'

import { ProductForm } from '@/components/product/ProductForm'
import { useProduct } from '@/hooks/useProduct'
import { ProductFormSchema, TProductForm } from '@/schemas/product/product.form.schemas'
import { TProduct } from '@/schemas/product/product.schemas'
import { primaryButton } from '@/utils/styles/button'

export type TEditProductProps = {
    product: TProduct
}

export const EditProduct = ({ product }: TEditProductProps) => {
    const { updateProduct } = useProduct()

    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm<TProductForm>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: product.name,
            key: product.key,
            description: product.description,
            printingTechnique: product.printingTechnique,
            category: product.category,
            material: product.material,
            measures: product.measures,
            printingMeasures: product.printingMeasures,
            minQuantity: product.minQuantity,
            colors: product.colors.map(({ color, hex }) => ({ color, hex }))
        }
    })

    useEffect(() => {
        if (updateProduct.error) toast.error(updateProduct.error)
    }, [updateProduct.error])

    useEffect(() => {
        if (updateProduct.success) toast.success(updateProduct.success)
    }, [updateProduct.success, product._id])

    const onSubmit = (data: TProductForm) => updateProduct.handleUpdateProduct(product._id, data)

    return (
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} noValidate>
            <ProductForm register={register} errors={errors} control={control} setValue={setValue} />

            <button type="submit" disabled={updateProduct.loading} className={`${primaryButton} flex w-full items-center justify-center gap-2.5`}>
                <FaPencil className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {updateProduct.loading ? 'Guardando...' : 'Actualizar Producto'}
            </button>
        </form>
    )
}
