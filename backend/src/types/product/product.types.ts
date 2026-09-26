import { HydratedDocument, Types } from "mongoose";

export type TColor = {
    color: string,
    image?: string,
    hex: string
};

export type TProduct = {
    name: string,
    key: string,
    description: string,
    colors: TColor[],
    generalImage?: string,
    printingTechnique: string,
    material: string,
    measures: string,
    printingMeasures: string,
    category: string,
    minQuantity: number,
    span: string
};

export type TProductWithID = TProduct & { _id: Types.ObjectId }

export type TProductDocument = HydratedDocument<TProduct>

// Respuesta paginada que arman getProducts y findProducts
export type TPaginatedProducts = {
    products: TProductWithID[],
    total: number,
    page: number,
    itemsPerPage: number,
    pages: number
}
