import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const AUTH_COOKIE_NAME = 'test_auth_token';

export function setAuthCookie(cookies: Cookies, token: string) {
	cookies.set(AUTH_COOKIE_NAME, token, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});
}

export function getAuthCookie(cookies: Cookies): string | undefined {
	return cookies?.get(AUTH_COOKIE_NAME);
}

export function removeAuthCookie(cookies: Cookies) {
	cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
}
