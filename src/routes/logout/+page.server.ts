import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies }) => {
		cookies.delete('session');
		throw redirect(303, '/');
	}
};
