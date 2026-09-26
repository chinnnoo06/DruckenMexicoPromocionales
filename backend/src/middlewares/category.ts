import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { categoryRepository } from "../repositories/category.repository";
import { HttpError } from "../utils/error";
import { TCategoryDocument } from "../types/category/category.types";
import { TMongoIdParams } from "../types/common/common.dtos";

declare global {
    namespace Express {
        interface Request {
            category?: TCategoryDocument
        }
    }
}

export const validateCategoryInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req)

    next()
}

export const validateCategoryExists = async (req: Request<TMongoIdParams>, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
        const category = await categoryRepository.findById(id)

        if (!category) {
            throw new HttpError(404, "No existe la categoría")
        }

        req.category = category

        next()
    } catch (error) {
        next(error)
    }
}
