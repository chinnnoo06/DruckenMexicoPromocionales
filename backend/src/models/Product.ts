import { Schema, model } from "mongoose";
import { TColor, TProduct } from "../types/product/product.types";

const ColorSchema = new Schema<TColor>({
  color: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  hex: {
    type: String,
    required: true
  }
}, { _id: false }); // Sin _id para los subdocumentos colores

const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  colors: {
    type: [ColorSchema],
    required: true,
    validate: {
      validator: function (val: TColor[]) {
        return val.length >= 1; // al menos un color
      },
      message: '{PATH} debe tener al menos un color'
    }
  },
  generalImage: {
    type: String,
    required: false
  },
  printingTechnique: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  measures: {
    type: String,
    required: true
  },
  printingMeasures: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  minQuantity: {
    type: Number,
    required: true
  },
  span: {
    type: String,
    required: true
  }
})

export const Product = model<TProduct>("Product", ProductSchema, "products");
