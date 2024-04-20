// Aqui definimos o schema da entidade Person e exportamos o tipo Person que é inferido a partir do schema.

import z from "zod";

export const UserSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    age: z.number(),
});

export type User = z.infer<typeof UserSchema>;