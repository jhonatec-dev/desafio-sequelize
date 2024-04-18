// Aqui definimos o schema da entidade Person e exportamos o tipo Person que é inferido a partir do schema.

import z from "zod";

export const PersonSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    age: z.number(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zip: z.string(),
});

export type Person = z.infer<typeof PersonSchema>;