import { z } from "zod";

export const shiftSchema = z.object({
  id: z.number(),
  sun: z.boolean(),
  mon: z.boolean(),
  tues: z.boolean(),
  wed: z.boolean(),
  thurs: z.boolean(),
  fri: z.boolean(),
  sat: z.boolean(),
});

export const attendanceSchema = z.object({
  id: z.number(),
  member: z.number(),
  current_date: z.coerce.date(),
  start_datetime: z.coerce.date().nullish(),
  end_datetime: z.coerce.date().nullish(),
  is_dayoff: z.boolean(),
  shift: shiftSchema,
  shift_duration: z.number(),
});

export const MemberSchema = z.object({
  id: z.number(),
  user: z.number(),
  full_name: z.string(),
  email: z.string().email(),
  is_admin: z.boolean(),
  job: z.string(),
  shift: shiftSchema,
  shift_duration: z.number(),
  attendance_set: z.array(attendanceSchema),
  total_work_time: z.number(),
  attended_work_time: z.number(),
  attended_dayoff_time: z.number(),
  total_work_days: z.number(),
  attended_work_days: z.number(),
  attended_dayoff_days: z.number(),
  attended_overtime: z.number(),
});

export type Member = z.infer<typeof MemberSchema>;
export default Member;
