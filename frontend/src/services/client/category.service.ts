import { TCategory } from "@/schemas/category/category.schemas";

export const getCategoriesService = async (): Promise<TCategory[]> => {
    const req = await fetch("/api/categories")

    if (!req.ok) {
        throw new Error("Request Failed")
    }

    const { categories } = await req.json()

    return categories
}
