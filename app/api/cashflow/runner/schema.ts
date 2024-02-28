import { z } from "zod";

const schema = z.object({
  id: z.number().optional(),
  user: z.number(),
  role: z.string().optional(),
  full_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  is_admin: z.boolean().optional(),
});

export type Runner = z.infer<typeof schema>;
export default schema;

export const RUNNER_ROLES = {
  MAKER: "maker",
  CHECKER: "checker",
};
