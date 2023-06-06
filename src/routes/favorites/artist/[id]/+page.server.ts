import api from '$lib/api.js';
import { error } from '@sveltejs/kit';

export const actions = {
	unfavorite: async (event) => {
		if (!event.locals.userId) throw error(401, 'Unauthorized');
		const data = await event.request.formData();
		const id = data.get('id') as string;
		await api.unfavoriteAlbum(id, event.locals.userId);
	}
};
