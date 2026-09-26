import { TProduct } from "@/schemas/product/product.schemas";

export type TSearchProductsParams = {
    category: string
    query: string
    page: number
}

export type TSearchProductsResult = {
    products: TProduct[]
    pages: number
}

export const searchProductsService = async ({ category, query, page }: TSearchProductsParams): Promise<TSearchProductsResult> => {
    const searchParams = new URLSearchParams({ category, query, page: String(page) })

    const req = await fetch(`/api/products/search?${searchParams.toString()}`)

    if (!req.ok) {
        throw new Error("Request Failed")
    }

    const { products, pages } = await req.json()

    return { products, pages }
}
