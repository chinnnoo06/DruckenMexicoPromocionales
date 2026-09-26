"use server"

import { updateTag } from "next/cache"

import { ErrorResponseSchema, SuccessResponseSchema } from "@/schemas/common/common.response.schemas"
import { TActionState } from "@/schemas/common/common.types"
import { TProduct } from "@/schemas/product/product.schemas"
import { getToken } from "@/services/auth/auth.token"

export const deleteProduct = async (_id: TProduct['_id']): Promise<TActionState> => {
    const url = `${process.env.API_URL}/products/${_id}`

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

    updateTag(`product-${_id}`)
    updateTag("catalog")

    return {
        error: "",
        success: success.message
    }
}