import { QueryFilter } from "mongoose";
import { HttpError } from "../utils/error";
import { randomSpanOption } from "../utils/spanOptions";
import { deleteProductImages, deleteUploadedFiles } from "../utils/deleteFiles";
import { productRepository } from "../repositories/product.repository";
import { categoryRepository } from "../repositories/category.repository";
import { TAddProductDto, TUpdateProductDto } from "../types/product/product.dtos";
import {
    TColor,
    TPaginatedProducts,
    TProduct,
    TProductDocument,
    TProductWithID
} from "../types/product/product.types";
import { TMulterFiles } from "../types/multer/multer.types";

const ITEMS_PER_PAGE = 20;

// Generador pseudoaleatorio simple
function random(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Shuffle determinista usando seed
function shuffleWithSeed<T>(array: T[], seed: number) {
    let m = array.length, t: T, i: number;
    const arr = [...array];
    while (m) {
        i = Math.floor(random(seed) * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
        seed++;
    }
    return arr;
}

// "todos" salta el filtro; cualquier otra categoría debe existir en la BD
const resolveCategoryName = async (category: string) => {
    if (category === "todos") return "";

    const categoryExist = await categoryRepository.findByName(category)

    if (!categoryExist) {
        throw new HttpError(404, "No existe esa categoría");
    }

    return categoryExist.name
}

// Toma los nombres de archivo que dejó multer y los pega al payload
const applyUploadedFiles = (
    data: TAddProductDto | TUpdateProductDto,
    files?: TMulterFiles
): Pick<TProduct, "colors" | "generalImage"> => {
    let generalImage: string | undefined;

    if (files?.generalImage && files.generalImage.length > 0) {
        generalImage = files.generalImage[0].filename;
    }

    const colorImages = files?.colorImages;

    const colors: TColor[] = data.colors.map((color, index) => {
        const image = colorImages && colorImages[index]
            ? colorImages[index].filename
            : undefined;

        return { ...color, image }
    });

    return { colors, generalImage }
}

export const productService = {

    async getAll(category: string, page: number): Promise<TPaginatedProducts> {
        const categoryName = await resolveCategoryName(category)

        const filter: QueryFilter<TProduct> = category === "todos" ? {} : { category: categoryName };

        const allProducts = await productRepository.findAll(filter)

        if (!allProducts || allProducts.length === 0) {
            throw new HttpError(404, "No hay productos");
        }

        // Seed basado en la hora actual (hora Unix / 3600)
        const seed = Math.floor(Date.now() / (1000 * 60 * 60));

        const shuffled = shuffleWithSeed(allProducts, seed);

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const paginated = shuffled.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        return {
            products: paginated as TProductWithID[],
            total: allProducts.length,
            page,
            itemsPerPage: ITEMS_PER_PAGE,
            pages: Math.ceil(allProducts.length / ITEMS_PER_PAGE)
        }
    },

    async find(category: string, page: number, search: string): Promise<TPaginatedProducts> {
        const categoryName = await resolveCategoryName(category)

        const filter: QueryFilter<TProduct> = {
            ...(category !== "todos" && { category: categoryName }),
            ...(search && {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { key: { $regex: search, $options: "i" } }
                ]
            })
        };

        let allProducts = await productRepository.findAll(filter)

        if (!allProducts || allProducts.length === 0) {
            throw new HttpError(404, "No hay productos");
        }

        // Reordenamos: coincidencias exactas primero
        if (search) {
            allProducts = allProducts.sort((a, b) => {
                const aExact =
                    a.name.toLowerCase() === search.toLowerCase() ||
                    a.key.toLowerCase() === search.toLowerCase();
                const bExact =
                    b.name.toLowerCase() === search.toLowerCase() ||
                    b.key.toLowerCase() === search.toLowerCase();

                if (aExact && !bExact) return -1;
                if (!aExact && bExact) return 1;
                return 0;
            });
        }

        // Paginamos manualmente
        const totalDocs = allProducts.length;
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const docs = allProducts.slice(start, end);

        return {
            products: docs as TProductWithID[],
            total: totalDocs,
            page,
            itemsPerPage: ITEMS_PER_PAGE,
            pages: Math.ceil(totalDocs / ITEMS_PER_PAGE)
        }
    },

    async getCarousel() {
        const products = await productRepository.getCarouselProducts()

        if (!products || products.length === 0) {
            throw new HttpError(404, "No hay productos");
        }

        return products
    },

    async remove(product: TProductDocument) {
        await product.deleteOne()

        deleteProductImages(product)
    },

    async add(data: TAddProductDto, files?: TMulterFiles) {
        try {
            const { colors, generalImage } = applyUploadedFiles(data, files)

            const product = await productRepository.addProduct({
                ...data,
                colors,
                generalImage,
                span: randomSpanOption()
            })

            return product
        } catch (error) {
            deleteUploadedFiles(files)
            throw error
        }
    },

    async update(product: TProductDocument, data: TUpdateProductDto, files?: TMulterFiles) {
        try {
            // Esta lógica elimina TODAS las imágenes del producto anterior.
            deleteProductImages(product)

            const { colors, generalImage } = applyUploadedFiles(data, files)

            product.set({
                ...data,
                colors,
                generalImage,
                span: randomSpanOption()
            });

            await product.save()

            return product
        } catch (error) {
            deleteUploadedFiles(files)
            throw error
        }
    },

    async getTotalCount() {
        return await productRepository.getTotalCount()
    }
}
