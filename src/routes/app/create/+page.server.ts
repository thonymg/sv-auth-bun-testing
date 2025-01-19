import { fail, redirect } from '@sveltejs/kit';
import { getAuthCookie, setUserDataCookie } from '$lib/utils/cookies';
import type { Actions } from './$types';

export const actions = {
	createJobApplication: async ({ request, cookies }) => {
		try {
			const token = getAuthCookie(cookies);
			if (!token) {
				return fail(401, { error: 'Not logged in' });
			}

			const formData = await request.formData();
			const email = formData.get('email')?.toString();
			const firstName = formData.get('firstName')?.toString();
			const lastName = formData.get('lastName')?.toString();

			if (!email || !firstName || !lastName) {
				return fail(400, { error: 'All fields are required' });
			}
			const response = await fetch(
				'https://hire-game.pertimm.dev/api/v1.1/job-application-request/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${token}`
					},
					body: JSON.stringify({
						email,
						first_name: firstName,
						last_name: lastName
					})
				}
			)
				.then(async (response) => {
					if (!response.ok) return fail(400, { error: 'Error' });
					let result: any;
					do {
						const response = await fetch(
							'https://hire-game.pertimm.dev/api/v1.1/job-application-request/',
							{
								method: 'GET',
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Token ${token}`
								}
							}
						);
						const _r = await response.json();
						result = _r.results[0];
						await new Promise((resolve) => setTimeout(resolve, 1000));
					} while (result?.status !== 'COMPLETED');
					return result;
				})
				.then(async (result) => {
					if (!result) return fail(400, { error: 'Error' });

					const _response = await fetch(result.confirmation_url, {
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Token ${token}`
						},
						body: JSON.stringify({
							confirmed: true
						})
					});
					if (!_response.ok) return fail(400, { error: 'Error' });
					const r_ = await _response.json();
					setUserDataCookie(cookies, result);
					return r_;
				});

			return { success: true };
		} catch (error) {
			return fail(500, { error: 'Server error' });
		}
	}
} satisfies Actions;
