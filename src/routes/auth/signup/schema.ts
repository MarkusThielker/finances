
import { z } from "zod";

export const formSchema = z.object({
    username: z.string().min(3).max(16),
    password: z.string().min(8),
});

export type FormSchema = typeof formSchema;
