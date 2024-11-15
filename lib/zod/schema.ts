import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(4).max(128),
  gender: z.enum(["Male", "Female"]),
  age: z.number().min(0),
  address: z.string().min(15).max(255),
});

export type Patient = z.infer<typeof patientSchema>;
