import { z } from "zod";

export const OrderItemSchema = z.object({
  ProductId: z.string(),
  ProductName: z.string(),
  ProductKey: z.string(),
  ProductCategory: z.string(),
  ProductColor: z.string(),
  ProductHexColor: z.string(),
  ProductImage: z.string(),
  ProductMinQuantity: z.number().int().positive(),
  OrderQuantity: z.number().int().positive(),
});

export const OrderSchema = z.array(OrderItemSchema);

export const OrderGroupSchema = z.object({
  ProductId: z.string(),
  ProductName: z.string(),
  ProductKey: z.string(),
  ProductMinQuantity: z.number().int().positive(),
  items: z.array(OrderItemSchema),
  totalQuantity: z.number().int().nonnegative(),
});

export type TOrderItem = z.infer<typeof OrderItemSchema>;
export type TOrder = z.infer<typeof OrderSchema>;
export type TOrderGroup = z.infer<typeof OrderGroupSchema>;
