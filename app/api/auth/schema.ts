import { z } from "zod";

export const tokenResponseSchema = z.object({
  access: z.string(),
  refresh: z.string().optional(),
});
export const credentialsSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(1, { message: "This field has to be filled." }),
});

export type Tokens = z.infer<typeof tokenResponseSchema>;
export type Credentials = z.infer<typeof credentialsSchema>;
