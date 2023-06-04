import api from '$lib/api';
import { redirect, error, fail } from '@sveltejs/kit';

export async function load({ params, locals }) {
	// TODO: waterfall
	const detail = await api.getMasterRelease(params.id);
	return {
		detail,
		title: detail.title
	};
}

export const actions = {
	favorite: async (event) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		// if (Math.random() < 0.3) return fail(500);
		await api.favoriteAlbum(id, event.locals.userId);
		throw redirect(303, `/album/${id}`);
	},
	unfavorite: async (event) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		await api.unfavoriteAlbum(id, event.locals.userId);
		throw redirect(303, `/album/${id}`);
	}
};
