// Aqui definimos o schema da entidade Person e exportamos o tipo Person que é inferido a partir do schema.

import z from "zod";

export const BookSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    userId: z.number(),
});

export type Book = z.infer<typeof BookSchema>;