import { redirect } from '@sveltejs/kit';

export const actions = {
	default: function ({ cookies }) {
		cookies.delete('session');
		throw redirect(303, '/');
	}
};
