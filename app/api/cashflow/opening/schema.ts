import { z } from "zod";

const schema = z.object({
  date: z.coerce.date(),
  balance: z.coerce.number().positive(),
});

export default schema;
