export interface User {
	email: string;
	token: string;
}

declare global {
	namespace App {
		interface Locals {
			user?: User;
		}
	}
}

export {};
