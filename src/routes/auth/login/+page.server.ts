import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getAuthCookie, setAuthCookie } from '$lib/utils/cookies';
import { loginSchema } from '$lib/schemas/auth';
import { ZodError } from 'zod';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const token = getAuthCookie(cookies);

	return {
		token,
		user: locals.user
	};
};

export const actions = {
	default: async ({ request, cookies, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const { email, password } = loginSchema.parse(formData);

			const response = await fetch('https://hire-game.pertimm.dev/api/v1.1/auth/login/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const result = await response.json();

			locals.user = result;

			setAuthCookie(cookies, result.token);
			return { success: true };
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
