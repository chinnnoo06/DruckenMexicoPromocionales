import { useState } from 'react'
import { useActionStatus } from './useActionStatus'
import { TCategoryForm } from '@/schemas/category/category.form.schemas'
import { addCategory } from '@/actions/add-category.action'
import { TCategory } from '@/schemas/category/category.schemas'
import { updateCategory } from '@/actions/update-category.action'
import { deleteCategory } from '@/actions/delete-category.action'

export const useCategory = () => {
    const addStatus = useActionStatus()
    const updateStatus = useActionStatus()
    const deleteStatus = useActionStatus()

    const [errorAdd, setErrorAdd] = useState<string | null>(null)
    const [successAdd, setSuccessAdd] = useState<string | null>(null)

    const [errorUpdate, setErrorUpdate] = useState<string | null>(null)
    const [successUpdate, setSuccessUpdate] = useState<string | null>(null)

    const [errorDelete, setErrorDelete] = useState<string | null>(null)
    const [successDelete, setSuccessDelete] = useState<string | null>(null)


    const handleAddCategory = async (data: TCategoryForm) => {
        if (addStatus.loading) return

        setErrorAdd(null)
        setSuccessAdd(null)

        addStatus.startLoading()

        const res = await addCategory(data)

        addStatus.stopLoading()

        if (res.error) return setErrorAdd(res.error)

        if (res.success) setSuccessAdd(res.success)
    }

    const handleUpdateCategory = async (_id: TCategory['_id'], data: TCategoryForm) => {
        if (updateStatus.loading) return

        setErrorUpdate(null)
        setSuccessUpdate(null)

        updateStatus.startLoading()

        const res = await updateCategory(_id, data)

        updateStatus.stopLoading()

        if (res.error) return setErrorUpdate(res.error)

        if (res.success) setSuccessUpdate(res.success)
    }

    const handleDeleteCategory = async (_id: TCategory['_id']) => {
        if (deleteStatus.loading) return

        setErrorDelete(null)
        setSuccessDelete(null)

        deleteStatus.startLoading()

        const res = await deleteCategory(_id)

        deleteStatus.stopLoading()

        if (res.error) return setErrorDelete(res.error)

        if (res.success) setSuccessDelete(res.success)
    }

    return {
        addCategory: {
            handleAddCategory,
            loading: addStatus.loading,
            error: errorAdd,
            success: successAdd
        },

        updateCategory: {
            handleUpdateCategory,
            loading: updateStatus.loading,
            error: errorUpdate,
            success: successUpdate
        },

        deleteCategory: {
            handleDeleteCategory,
            loading: deleteStatus.loading,
            error: errorDelete,
            success: successDelete
        }
    }
}
