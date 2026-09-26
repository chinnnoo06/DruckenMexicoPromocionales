"use server"

import { updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/schemas/common/common.types"
import { ProductFormSchema, TProductForm } from "@/schemas/product/product.form.schemas"
import { TProduct } from "@/schemas/product/product.schemas"
import { getToken } from "@/services/auth/auth.token"
import { buildProductFormData } from "@/utils/productFormData"

export const updateProduct = async (_id: TProduct['_id'], data: TProductForm): Promise<TActionState> => {

    const parsed = ProductFormSchema.safeParse(data)

    if (!parsed.success) {
        return {
            error: "Datos inválidos",
            success: ""
        }
    }

    const url = `${process.env.API_URL}/products/${_id}`

    const token = await getToken()

    const req = await fetch(url, {
        method: "PUT",
        headers: {
            // Sin Content-Type: lo pone fetch con el boundary del multipart
            Authorization: `Bearer ${token}`,
            "Origin": process.env.DOMAIN as string
        },
        body: buildProductFormData(parsed.data)
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

    updateTag(`product-${_id}`)
    updateTag("catalog")

    return {
        error: "",
        success: success.message
    }
}
