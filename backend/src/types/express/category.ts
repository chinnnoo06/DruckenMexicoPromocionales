import { Request } from "express"
import { TCategoryDocument } from "../category/category.types"

// Request después de validateCategoryExists: ahí la categoría ya existe,
// así que no es opcional como en la augmentación global de Express.
export interface TRequestWithCategory<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    category: TCategoryDocument
}
