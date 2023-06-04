import api from '$lib/api.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	unfavorite: async (event) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		await api.unfavoriteAlbum(id, event.locals.userId);
		throw redirect(303, '/favorites');
	}
};
