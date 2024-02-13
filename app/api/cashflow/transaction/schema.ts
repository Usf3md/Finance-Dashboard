import { z } from "zod";

const schema = z.object({
  openingId: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  date: z.coerce.date().optional(),
  amount: z.coerce.number().positive(),
  type: z.coerce.boolean(),
  detail: z.string().min(1),
  note: z.string(),
  image: z.string(),
});
export default schema;
