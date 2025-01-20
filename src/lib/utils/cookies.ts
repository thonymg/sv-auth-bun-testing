import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const AUTH_COOKIE_NAME = 'test_auth_token';
export const USER_DATA_COOKIE_NAME = 'test_user_data';

export function setAuthCookie(cookies: Cookies, token: string) {
	cookies.set(AUTH_COOKIE_NAME, token, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7
	});
}

export function getAuthCookie(cookies: Cookies): string | undefined {
	return cookies?.get(AUTH_COOKIE_NAME);
}

export function removeAuthCookie(cookies: Cookies) {
	cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
}

export function setUserDataCookie(cookies: Cookies, userData: Record<string, any>) {
	cookies.set(USER_DATA_COOKIE_NAME, JSON.stringify(userData), {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 
	});
}

export function getUserDataCookie(cookies: Cookies): Record<string, any> | undefined {
	const data = cookies.get(USER_DATA_COOKIE_NAME);
	return data ? JSON.parse(data) : undefined;
}

export function removeUserDataCookie(cookies: Cookies) {
	cookies.delete(USER_DATA_COOKIE_NAME, { path: '/' });
}
