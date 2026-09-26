export type TProductColorDto = {
    color: string,
    hex: string
}

export type TAddProductDto = {
    name: string,
    key: string,
    description: string,
    colors: TProductColorDto[],
    printingTechnique: string,
    material: string,
    measures: string,
    printingMeasures: string,
    category: string,
    minQuantity: number
}

export type TUpdateProductDto = TAddProductDto

export type TGetProductsQueryParams = {
    category?: string,
    page?: string,
    search?: string
}
