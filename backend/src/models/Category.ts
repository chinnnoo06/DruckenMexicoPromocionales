import { Schema, model } from "mongoose";
import { TCategory } from "../types/category/category.types";

const CategorySchema = new Schema<TCategory>({
    name: {
        type: String,
        require: true
    }
})

export const Category = model<TCategory>("Category", CategorySchema, "categorys");
