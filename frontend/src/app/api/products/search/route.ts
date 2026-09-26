import { CatalogProductsResponseSchema } from "@/schemas/product/product.response.schemas";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category") ?? "todos"
    const query = searchParams.get("query")
    const page = searchParams.get("page") ?? "1"

    if (!query || query.trim() === "") {
        return Response.json({ error: "Falta el parámetro query" }, { status: 400 })
    }

    const backendParams = new URLSearchParams({ category, search: query, page })

    const url = `${process.env.API_URL}/products?${backendParams.toString()}`

    const req = await fetch(url, {
        headers: {
            "Origin": process.env.DOMAIN as string
        },
        cache: "no-store"
    })

    const json = await req.json()

    if (!req.ok) {
        return Response.json(json.error, { status: req.status })
    }

    const result = CatalogProductsResponseSchema.safeParse(json);

    if (!result.success) {
        throw new Error("Invalid response");
    }

    return Response.json(result.data)
}
