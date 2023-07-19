import api from '$lib/api';
import { delay } from '$lib/util.js';
import { fail } from '@sveltejs/kit';

export async function load({ params }) {
	const detail = await api.getMasterRelease(params.id);
	return {
		detail,
		title: detail.title
	};
}

export const actions = {
	favorite: async (event) => {
		await delay(500);
		// if (Math.random() < 0.5) return fail(400);
		await api.favoriteAlbum(event.params.id, event.locals.userId);
	},
	unfavorite: async (event) => {
		await delay(500);
		// if (Math.random() < 0.5) return fail(400);
		await api.unfavoriteAlbum(event.params.id, event.locals.userId);
	}
};
