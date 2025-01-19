import type { PageServerLoad } from './$types';
import { getAuthCookie } from '$lib/utils/cookies';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = getAuthCookie(cookies);
	return {
		token
	};
};
