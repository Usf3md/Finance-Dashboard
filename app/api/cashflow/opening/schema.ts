import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  date: z.coerce.date(),
  balance: z.coerce.number().positive(),
});

export type Opening = z.infer<typeof schema>;
export default schema;
