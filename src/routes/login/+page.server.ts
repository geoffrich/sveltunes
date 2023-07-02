import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async function ({ request, cookies }) {
		const data = await request.formData();
		const user = data.get('username');
		const password = data.get('password');
		if (!user || !password) {
			return fail(400, {
				error: 'Missing username or password.'
			});
		} else if (password !== 'sveltekit') {
			return fail(400, {
				error: 'Incorrect username or password.'
			});
		}

		// this is handwaving a lot of auth!
		cookies.set('session', '{ "userId": 123 }');
		throw redirect(303, '/favorites');
	}
};
