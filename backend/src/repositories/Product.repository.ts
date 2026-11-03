import { QueryFilter } from "mongoose";
import { Product } from "../models/Product";
import { TProduct, TProductWithID } from "../types/product/product.types";

export class ProductRepository {

    static async findAll(filter: QueryFilter<TProduct>) {
        return Product.find(filter).sort({ _id: 1 });
    }

    static async findById(id: string) {
        return Product.findById(id);
    }

    static async getCarouselProducts() {
        return Product.aggregate<TProductWithID>([
            { $sample: { size: 15 } }
        ]);
    }

    static async addProduct(data: TProduct) {
        return Product.create(data)
    }

    static async getTotalCount() {
        return Product.countDocuments()
    }

    static async updateSpan(id: TProductWithID["_id"], span: string) {
        return Product.findByIdAndUpdate(id, { span });
    }

    static async updateMany(oldCategoryName: string, newCategoryName: string) {
        return Product.updateMany(
            { category: oldCategoryName },
            { $set: { category: newCategoryName } }
        );
    }

    static async deleteMany(categoryName: string) {
        return Product.deleteMany({ category: categoryName });
    }
}
