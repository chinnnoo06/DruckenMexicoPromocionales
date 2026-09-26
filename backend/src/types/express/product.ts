import { Request } from "express"
import { TProductDocument } from "../product/product.types"

// Request después de validateProductExists: ahí el producto ya existe,
// así que no es opcional como en la augmentación global de Express.
export interface TRequestWithProduct<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    product: TProductDocument
}
