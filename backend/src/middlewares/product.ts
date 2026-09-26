import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { productRepository } from "../repositories/product.repository";
import { HttpError } from "../utils/error";
import { TProductDocument } from "../types/product/product.types";
import { TMongoIdParams } from "../types/common/common.dtos";

declare global {
    namespace Express {
        interface Request {
            product?: TProductDocument
        }
    }
}

export const validateProductInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("Nombre obligatorio").run(req)
    await body("description").notEmpty().withMessage("Descripción obligatoria").run(req)
    await body("category").notEmpty().isAlpha('es-ES', { ignore: ' -_' }).withMessage("Categoría inválida").run(req)
    await body("key").notEmpty().withMessage("Clave obligatorio").run(req)
    await body("printingTechnique").notEmpty().withMessage("Técnica de impresión obligatoria").run(req)
    await body("material").notEmpty().withMessage("Material obligatorio").run(req)
    await body("measures").notEmpty().withMessage("Medidas obligatorias").run(req)
    await body("printingMeasures").notEmpty().withMessage("Medidas de impresión obligatorias").run(req)
    await body("minQuantity").isInt({ min: 1 }).withMessage("Cantidad mínima invalida").run(req)
    await body("colors").isArray({ min: 1 }).run(req)
    await body("colors.*.color").notEmpty().withMessage("Color obligatorio").run(req)
    await body("colors.*.hex").notEmpty().isHexColor().withMessage("Color hex invalido").run(req)

    next()
}

export const validateProductExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const product = await productRepository.findById(id)

        if (!product) {
            throw new HttpError(404, "No existe el producto")
        }

        req.product = product

        next()
    } catch (error) {
        next(error)
    }
}
