import { OrderCart } from "@/components/order/OrderCart";
import { TOrderGroup } from "@/store/orderStore";

export type TMapOrderProps = {
  groups: TOrderGroup[];
};

export const MapOrder = ({ groups }: TMapOrderProps) => {
  return (
    <div className="flex flex-col flex-[70%] min-h-100">
      <div className="space-y-2">
        {groups.map((group) => (
          <OrderCart key={group.ProductId} group={group} />
        ))}
      </div>
    </div>
  );
};
