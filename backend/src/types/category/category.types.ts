import { HydratedDocument, Types } from "mongoose";

export type TCategory = {
    name: string
};

export type TCategoryWithID = TCategory & { _id: Types.ObjectId }

export type TCategoryDocument = HydratedDocument<TCategory>

// Lo que devuelve el aggregate de getCategories: la categoría más el
// número de productos que la referencian por nombre.
export type TCategoryWithProductCount = TCategoryWithID & {
    productCount: number
}
