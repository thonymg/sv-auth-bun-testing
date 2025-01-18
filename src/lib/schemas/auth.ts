import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z
	.object({
		email: z.string().email('Invalid email address'),
		password1: z.string().min(6, 'Password must be at least 6 characters'),
		password2: z.string()
	})
	.refine((data: { password1: string; password2: string }) => data.password1 === data.password2, {
		message: "Passwords don't match",
		path: ['password2']
	});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
