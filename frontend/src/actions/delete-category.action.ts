"use server"

import { revalidatePath, updateTag } from "next/cache"

import { TCategory } from "@/schemas/category/category.schemas"
import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/schemas/common/common.types"
import { getToken } from "@/services/auth/auth.token"

export const deleteCategory = async (_id: TCategory['_id']): Promise<TActionState> => {
    const url = `${process.env.API_URL}/categories/${_id}`

    const token = await getToken()

    const req = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Origin": process.env.DOMAIN as string
        }
    })

    const json = await req.json()

    if (!req.ok) {
        const { message } = ErrorResponseSchema.parse(json)

        return {
            error: message ?? "Error Desconocido",
            success: ""
        }
    }

    const success = SuccessResponseSchema.parse(json)

    revalidatePath("/admin/categorias")

    updateTag("catalog")
    updateTag("categories")

    return {
        error: "",
        success: success.message
    }
}
