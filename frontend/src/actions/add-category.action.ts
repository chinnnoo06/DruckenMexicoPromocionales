"use server"

import { revalidatePath, updateTag } from "next/cache"

import { CategoryFormSchema, TCategoryForm } from "@/schemas/category/category.form.schemas"
import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/schemas/common/common.types"
import { getToken } from "@/services/auth/auth.token"

export const addCategory = async (data: TCategoryForm): Promise<TActionState> => {

    const parsed = CategoryFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const url = `${process.env.API_URL}/categories`

    const token = await getToken()

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Origin": process.env.DOMAIN as string
        },
        body: JSON.stringify(parsed.data)
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
