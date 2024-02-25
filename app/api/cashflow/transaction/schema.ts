import { z } from "zod";
import RunnerSchema from "../runner/schema";

const schema = z.object({
  id: z.number().nullish(),
  opening: z.number(),
  runner: RunnerSchema.or(z.number()),
  amount: z.coerce.number().positive(),
  transaction_type: z.coerce.boolean(),
  transaction_detail: z.string().min(1).or(z.number()).nullish(),
  transaction_status: z.string().min(1).nullish(),
  revisor: RunnerSchema.nullish(),
  note: z.string().nullish(),
  date: z.coerce.date(),
  image: z.string().nullish(),
});

export type Transaction = z.infer<typeof schema>;
export default schema;
