import type { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { TAddCategoryDto, TUpdateCategoryDto } from "../types/category/category.dtos";
import { TMongoIdParams } from "../types/common/common.dtos";
import { TRequestWithCategory } from "../types/express/category";

export class CategoryController {

    static getCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await categoryService.getAll()

            return res.status(200).json({
                status: "success",
                categories,
                message: "Categorias obtenidas"
            });
        } catch (error) {
            console.log("Error al obtener categorías");
            next(error)
        }
    }

    static addCategory = async (req: Request<{}, unknown, TAddCategoryDto>, res: Response, next: NextFunction) => {
        const params = req.body;

        try {
            const category = await categoryService.add(params)

            console.log("Categoria registrada con exito");
            return res.status(200).json({
                status: "success",
                category,
                message: "Categoria registrada con exito"
            });
        } catch (error) {
            console.log("Error al guardar categoria en la bd");
            next(error)
        }
    }

    static updateCategory = async (req: TRequestWithCategory<TMongoIdParams, unknown, TUpdateCategoryDto>, res: Response, next: NextFunction) => {
        const params = req.body;

        try {
            const category = await categoryService.update(req.category, params)

            console.log("Categoria y productos actualizados con éxito");
            return res.status(200).json({
                status: "success",
                category,
                message: "Categoria actualizada correctamente"
            });

        } catch (error) {
            console.log("Error al actualizar categoria en la bd", error);
            next(error)
        }
    }

    static remove = async (req: TRequestWithCategory<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            await categoryService.remove(req.category)

            console.log("Categoria y productos eliminados correctamente");
            return res.status(200).json({
                status: "success",
                message: "Categoria y productos eliminados correctamente"
            });
        } catch (error) {
            console.log("Error al eliminar categoria en la bd", error);
            next(error)
        }
    }
}
