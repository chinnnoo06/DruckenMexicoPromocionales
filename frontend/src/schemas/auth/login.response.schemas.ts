import z from "zod";

export const LoginSuccessResponseSchema = z.object({
  status: z.literal("success"),
  token: z.string()
})