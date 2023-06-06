import api from '$lib/api';

export async function load({ params, setHeaders }) {
	const detail = await api.getMasterRelease(params.id);
	setHeaders({
		'Cache-Control': 'public, max-age=60'
	});
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
		return {
			success: true
		};
	},
	unfavorite: async (event) => {
		const data = await event.request.formData();
		const id = data.get('id') as string;
		await api.unfavoriteAlbum(id, event.locals.userId);
		return {
			success: true
		};
	}
};
