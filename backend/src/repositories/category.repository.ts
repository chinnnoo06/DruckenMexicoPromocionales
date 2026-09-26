import { Category } from "../models/Category";
import { TAddCategoryDto } from "../types/category/category.dtos";
import { TCategoryWithProductCount } from "../types/category/category.types";

export const categoryRepository = {

    async getCategories() {
        return Category.aggregate<TCategoryWithProductCount>([
            {
                $lookup: {
                    from: "products",
                    localField: "name",
                    foreignField: "category",
                    as: "products"
                }

            },
            {
                $addFields: {
                    productCount: { $size: "$products" }
                }
            },
            {
                $project: {
                    products: 0
                }
            }
        ]);
    },

    async addCategory(data: TAddCategoryDto) {
        return Category.create(data)
    },

    async findById(id: string) {
        return Category.findById(id);
    },

    async findByName(name: string) {
        return Category.findOne({ name }).collation({ locale: "es", strength: 1 });
    }
}
