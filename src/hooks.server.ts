import type { Handle } from '@sveltejs/kit';
import { getAuthCookie } from '$lib/utils/cookies';

export const handle: Handle = async ({ event, resolve }) => {
	const token = getAuthCookie(event.cookies);

	if (token) {
		event.locals.user = {
			token,
			email: ''
		};
	}

	return resolve(event);
};
