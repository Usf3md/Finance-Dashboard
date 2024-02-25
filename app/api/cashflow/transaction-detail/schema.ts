import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  detail: z.string().min(1),
});

export type TransactionDetail = z.infer<typeof schema>;
export default schema;
