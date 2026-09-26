import { TProduct } from "@/schemas/product/product.schemas";
import { GlobalImage } from "@/utils/constants";

export type TImgProductProps = {
  product: TProduct;
  selectedColor: number;
};

export const ImgProduct = ({ product, selectedColor }: TImgProductProps) => {
  const image = product.colors[selectedColor].image ?? product.generalImage;

  return (
    <div className="w-full md:w-2/5 bg-white rounded-lg shadow-md flex items-center justify-center">
      <div className="w-full max-w-md h-90 sm:h-100 md:h-125 aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${GlobalImage.url}/${image}`}
          alt={product.name}
          loading="lazy"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
