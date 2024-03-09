import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  full_name: z.string(),
  email: z.string().email(),
  is_control: z.boolean(),
});

export type User = z.infer<typeof schema>;
