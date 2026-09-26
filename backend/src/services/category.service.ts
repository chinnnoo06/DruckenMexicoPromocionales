import { HttpError } from "../utils/error";
import { categoryRepository } from "../repositories/category.repository";
import { productRepository } from "../repositories/product.repository";
import { TAddCategoryDto, TUpdateCategoryDto } from "../types/category/category.dtos";
import { TCategoryDocument } from "../types/category/category.types";

export const categoryService = {

    async getAll() {
        const categories = await categoryRepository.getCategories()

        if (!categories || categories.length === 0) {
            throw new HttpError(404, "No hay categorías");
        }

        return categories
    },

    async add(data: TAddCategoryDto) {
        const existingCategory = await categoryRepository.findByName(data.name)

        if (existingCategory) {
            throw new HttpError(409, "La categoría ya existe");
        }

        const category = await categoryRepository.addCategory(data)

        return category
    },

    async update(category: TCategoryDocument, data: TUpdateCategoryDto) {
        const existingCategory = await categoryRepository.findByName(data.name)

        if (existingCategory && existingCategory._id.toString() !== category._id.toString()) {
            throw new HttpError(409, "Ya existe una categoría con ese nombre");
        }

        const oldCategoryName = category.name;

        category.name = data.name

        await category.save()

        if (oldCategoryName !== data.name) {
            await productRepository.updateMany(oldCategoryName, data.name)
        }

        return category
    },

    async remove(category: TCategoryDocument) {
        await category.deleteOne()

        await productRepository.deleteMany(category.name)
    }
}
