import { z } from "zod";

const schema = z.object({
  openingId: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  amount: z.coerce.number().positive(),
  type: z.coerce.boolean(),
  description: z.string().min(1),
  image: z.string(),
});
export default schema;
