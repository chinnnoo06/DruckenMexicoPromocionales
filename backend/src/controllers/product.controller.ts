import type { NextFunction, Request, Response } from "express";
import { productService } from "../services/product.service";
import { TAddProductDto, TGetProductsQueryParams, TUpdateProductDto } from "../types/product/product.dtos";
import { TMongoIdParams } from "../types/common/common.dtos";
import { TMulterFiles } from "../types/multer/multer.types";
import { TRequestWithProduct } from "../types/express/product";

export class ProductController {

    static getProducts = async (req: Request<{}, unknown, unknown, TGetProductsQueryParams>, res: Response, next: NextFunction) => {
        const categoryParam = req.query.category || "todos";
        const category = categoryParam === "todos" ? "todos" : categoryParam.replace(/-/g, " ");
        const search = (req.query.search || "").trim();

        let page = parseInt(req.query.page ?? "");
        if (isNaN(page) || page < 1) page = 1;

        try {
            const data = search
                ? await productService.find(category, page, search)
                : await productService.getAll(category, page)

            const payload = {
                status: "success",
                products: data.products,
                total: data.total,
                page: data.page,
                itemsPerPage: data.itemsPerPage,
                pages: data.pages
            };

            // La búsqueda se retrasa para que el indicador de carga alcance a verse
            if (search) {
                return setTimeout(() => res.status(200).json(payload), 500);
            }

            return res.status(200).json(payload);

        } catch (error) {
            console.error("Error al listar productos", error);
            next(error)
        }
    }

    static getOneProduct = async (req: TRequestWithProduct<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            return res.status(200).send({
                status: "success",
                product: req.product
            });

        } catch (error) {
            console.error("Error al obtener producto", error);
            next(error)
        }
    }

    static getCarouselProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await productService.getCarousel()

            return res.status(200).send({
                status: "success",
                products
            });
        } catch (error) {
            console.error("Error al obtener productos del carrusel", error);
            next(error)
        }
    }

    static deleteProduct = async (req: TRequestWithProduct<TMongoIdParams>, res: Response, next: NextFunction) => {
        try {
            await productService.remove(req.product)

            return res.status(200).send({
                status: "success",
                message: "Producto eliminado correctamente"
            });
        } catch (error) {
            console.log("Error al eliminar el producto");
            next(error)
        }
    }

    static addProduct = async (req: Request<{}, unknown, TAddProductDto>, res: Response, next: NextFunction) => {
        const params = req.body;
        const files = req.files as TMulterFiles | undefined;

        try {
            const product = await productService.add(params, files)

            return res.status(200).json({
                status: "success",
                product,
                message: "Producto registrado con éxito"
            });

        } catch (error) {
            console.error("Error al agregar el producto:", error);
            next(error)
        }
    }

    static updateProduct = async (req: TRequestWithProduct<TMongoIdParams, unknown, TUpdateProductDto>, res: Response, next: NextFunction) => {
        const params = req.body
        const files = req.files as TMulterFiles | undefined;

        try {
            const product = await productService.update(req.product, params, files)

            return res.status(200).json({
                status: "success",
                product,
                message: "Producto actualizado con éxito"
            });
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            next(error)
        }
    }

    static getTotalCountProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const count = await productService.getTotalCount()

            return res.status(200).json({
                status: "success",
                count,
                message: "Total obtenido con éxito"
            });
        } catch (error) {
            console.error("Error al obtener total:", error);
            next(error)
        }
    }
}
