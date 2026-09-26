"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "react-toastify"
import { FaCirclePlus } from 'react-icons/fa6'

import { ProductForm } from '@/components/product/ProductForm'
import { useProduct } from '@/hooks/useProduct'
import { ProductFormSchema, TProductForm } from '@/schemas/product/product.form.schemas'
import { primaryButton } from '@/utils/styles/button'

export const AddProduct = () => {
    const { addProduct } = useProduct()

    const { register, control, setValue, handleSubmit, formState: { errors } } = useForm<TProductForm>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: '',
            key: '',
            description: '',
            printingTechnique: '',
            category: '',
            material: '',
            measures: '',
            printingMeasures: '',
            minQuantity: 1,
            colors: [{ color: '', hex: '' }]
        }
    })

    useEffect(() => {
        if (addProduct.error) toast.error(addProduct.error)
    }, [addProduct.error])

    useEffect(() => {
        if (addProduct.success) toast.success(addProduct.success)
    }, [addProduct.success])

    const onSubmit = (data: TProductForm) => addProduct.handleAddProduct(data)

    return (
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)} noValidate>
            <ProductForm register={register} errors={errors} control={control} setValue={setValue} />

            <button type="submit" disabled={addProduct.loading} className={`${primaryButton} flex w-full items-center justify-center gap-2.5`}>
                <FaCirclePlus className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {addProduct.loading ? 'Guardando...' : 'Crear Producto'}
            </button>
        </form>
    )
}
