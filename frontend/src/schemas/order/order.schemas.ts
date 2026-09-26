import { z } from "zod";

/**
 * Una línea del pedido tal como se guarda en localStorage.
 * Este schema es el contrato entre la ficha de producto (que escribe) y /pedido (que lee):
 * por eso la línea guarda copia del hex y del mínimo, para que el carrito se pinte y se
 * valide sin volver a pedir el producto al backend.
 */
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

export type TOrderItem = z.infer<typeof OrderItemSchema>;

export type TOrder = z.infer<typeof OrderSchema>;
