import { FaMinus, FaPlus } from "react-icons/fa6";

export type TQuantityButtonsProps = {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  min?: number;
};

export const QuantityButtons = ({ quantity, increaseQuantity, decreaseQuantity, min = 1 }: TQuantityButtonsProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={decreaseQuantity}
        disabled={quantity <= min}
        aria-label="Disminuir cantidad"
        className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg border border-[#9F531B] text-[#9F531B] cursor-pointer hover:bg-[#9F531B] hover:text-[#EEEEEF] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#9F531B]"
      >
        <FaMinus className="h-3 w-3 lg:h-3.5 lg:w-3.5" aria-hidden="true" />
      </button>

      <span
        aria-live="polite"
        className="min-w-12 text-center text-[#1A1615]/75 text-sm lg:text-base font-medium"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={increaseQuantity}
        aria-label="Aumentar cantidad"
        className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg border border-[#9F531B] text-[#9F531B] cursor-pointer hover:bg-[#9F531B] hover:text-[#EEEEEF] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#9F531B]"
      >
        <FaPlus className="h-3 w-3 lg:h-3.5 lg:w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
};
