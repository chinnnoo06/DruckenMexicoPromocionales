import { HttpError } from "../utils/error";
import { CategoryRepository } from "../repositories/Category.repository";
import { ProductRepository } from "../repositories/Product.repository";
import { TAddCategoryDto, TUpdateCategoryDto } from "../types/category/category.dtos";
import { TCategoryDocument } from "../types/category/category.types";

export class CategoryService {

    static async getAll() {
        const categories = await CategoryRepository.getCategories()

        if (!categories || categories.length === 0) {
            throw new HttpError(404, "No hay categorías");
        }

        return categories
    }

    static async add(data: TAddCategoryDto) {
        const existingCategory = await CategoryRepository.findByName(data.name)

        if (existingCategory) {
            throw new HttpError(409, "La categoría ya existe");
        }

        const category = await CategoryRepository.addCategory(data)

        return category
    }

    static async update(category: TCategoryDocument, data: TUpdateCategoryDto) {
        const existingCategory = await CategoryRepository.findByName(data.name)

        if (existingCategory && existingCategory._id.toString() !== category._id.toString()) {
            throw new HttpError(409, "Ya existe una categoría con ese nombre");
        }

        const oldCategoryName = category.name;

        category.name = data.name

        await category.save()

        if (oldCategoryName !== data.name) {
            await ProductRepository.updateMany(oldCategoryName, data.name)
        }

        return category
    }

    static async remove(category: TCategoryDocument) {
        await category.deleteOne()

        await ProductRepository.deleteMany(category.name)
    }
}
