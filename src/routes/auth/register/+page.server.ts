import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { registerSchema } from '$lib/schemas/auth';
import { ZodError } from 'zod';

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const validatedData = registerSchema.parse(formData);

			const response = await fetch('https://hire-game.pertimm.dev/api/v1.1/auth/register/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(validatedData)
			});
			return await response.json();
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.errors.reduce(
					(acc, err) => {
						acc[err.path[0]] = err.message;
						return acc;
					},
					{} as Record<string, string>
				);

				return fail(400, {
					error: 'Validation failed',
					errors,
					email: formData.email as string
				});
			}

			return fail(500, {
				error: 'An unexpected error occurred',
				email: formData.email as string
			});
		}
	}
} satisfies Actions;
