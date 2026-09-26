import { QueryFilter } from "mongoose";
import { Product } from "../models/Product";
import { TProduct, TProductWithID } from "../types/product/product.types";

export const productRepository = {

    async findAll(filter: QueryFilter<TProduct>) {
        return Product.find(filter).sort({ _id: 1 });
    },

    async findById(id: string) {
        return Product.findById(id);
    },

    async getCarouselProducts() {
        return Product.aggregate<TProductWithID>([
            { $sample: { size: 15 } }
        ]);
    },

    async addProduct(data: TProduct) {
        return Product.create(data)
    },

    async getTotalCount() {
        return Product.countDocuments()
    },

    async updateSpan(id: TProductWithID["_id"], span: string) {
        return Product.findByIdAndUpdate(id, { span });
    },

    async updateMany(oldCategoryName: string, newCategoryName: string) {
        return Product.updateMany(
            { category: oldCategoryName },
            { $set: { category: newCategoryName } }
        );
    },

    async deleteMany(categoryName: string) {
        return Product.deleteMany({ category: categoryName });
    }
}
