import { CategoriesResponseSchema } from "@/schemas/category/category.response.schemas";

export async function GET() {
    const url = `${process.env.API_URL}/categories`

    const req = await fetch(url, {
        headers: {
            "Origin": process.env.DOMAIN as string
        }
    })

    const json = await req.json()

    if (!req.ok) {
        return Response.json(json.error, { status: req.status })
    }

    const result = CategoriesResponseSchema.safeParse(json);

    if (!result.success) {
        throw new Error("Invalid response");
    }

    return Response.json(result.data)
}
