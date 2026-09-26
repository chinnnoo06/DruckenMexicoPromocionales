"use client";

import { useState } from "react";

import { TProduct } from "@/schemas/product/product.schemas";
import { ImgProduct } from "./ImgProduct";
import { InfoProduct } from "./InfoProduct";

export type TProductDetailProps = {
  product: TProduct;
  isAdmin?: boolean;
};

export const ProductDetail = ({ product, isAdmin = false }: TProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 divide-y md:divide-x md:divide-y-0 divide-[#9F531B]/25">
      <ImgProduct product={product} selectedColor={selectedColor} />

      <InfoProduct
        product={product}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        isAdmin={isAdmin}
      />
    </div>
  );
};
