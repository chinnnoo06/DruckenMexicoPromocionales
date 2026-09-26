import { useState } from 'react'
import { useActionStatus } from './useActionStatus'
import { TProductForm } from '@/schemas/product/product.form.schemas'
import { addProduct } from '@/actions/add-product.action'
import { TProduct } from '@/schemas/product/product.schemas'
import { updateProduct } from '@/actions/update-product.action'
import { deleteProduct } from '@/actions/delete-product.action'

export const useProduct = () => {
 const addStatus = useActionStatus()
    const updateStatus = useActionStatus()
    const deleteStatus = useActionStatus()

    const [errorAdd, setErrorAdd] = useState<string | null>(null)
    const [successAdd, setSuccessAdd] = useState<string | null>(null)

    const [errorUpdate, setErrorUpdate] = useState<string | null>(null)
    const [successUpdate, setSuccessUpdate] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)


    const handleAddProduct = async (data: TProductForm) => {
        if (addStatus.loading) return

        setErrorAdd(null)
        setSuccessAdd(null)

        addStatus.startLoading()

        const res = await addProduct(data)

        addStatus.stopLoading()

        if (res.error) return setErrorAdd(res.error)

        if (res.success) setSuccessAdd(res.success)
    }

    const handleUpdateProduct = async (_id: TProduct['_id'], data: TProductForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateProduct(_id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleDeleteProduct = async (_id: TProduct['_id']) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteProduct(_id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        addProduct: {
            handleAddProduct,
            loading: addStatus.loading,
            error: errorAdd,
            success: successAdd
        },

        updateProduct: {
            handleUpdateProduct,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        deleteProduct: {
            handleDeleteProduct,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
