import { getUserDataCookie } from './../../../../$lib/utils/cookies';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const userData = getUserDataCookie(cookies);
	return {
		userData
	};
};
