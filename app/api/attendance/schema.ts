import { z } from "zod";
import { attendanceSchema } from "./member/schema";

export type Attendance = z.infer<typeof attendanceSchema>;
