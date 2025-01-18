import type { Cookies } from '@sveltejs/kit';

export const setAuthCookie = (cookies: Cookies, token: string) => {
	cookies.set('auth_token', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});
};

export const getAuthCookie = (cookies: Cookies): string | undefined => {
	return cookies.get('auth_token');
};

export const setUserDataCookie = (cookies: Cookies, userData: any) => {
	cookies.set('user_data', JSON.stringify(userData), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});
};

export const getUserDataCookie = (cookies: Cookies): any | undefined => {
	const data = cookies.get('user_data');
	return data ? JSON.parse(data) : undefined;
};
