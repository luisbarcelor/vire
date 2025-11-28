import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .refine(val => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
    .refine(val => /[a-z]/.test(val), 'Password must contain at least one lowercase letter')
    .refine(val => /\d/.test(val), 'Password must contain at least one number')
});

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string(),
});