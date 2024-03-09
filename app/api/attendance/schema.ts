import { z } from "zod";

const schema = z.object({
  id: z.number(),
  member: z.number(),
  current_day: z.coerce.date(),
  start_datetime: z.coerce.date(),
  end_datetime: z.coerce.date(),
  is_dayoff: z.boolean(),
});

export type Attendance = z.infer<typeof schema>;
export default schema;
