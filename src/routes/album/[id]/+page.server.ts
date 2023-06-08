import api from '$lib/api';

export async function load({ params, setHeaders, locals }) {
	const detail = await api.getMasterRelease(params.id);
	setHeaders({
		'Cache-Control': 'public, max-age=60'
	});
	return {
		detail,
		isFavorite: api.isAlbumFavorited(params.id, locals.userId),
		title: detail.title
	};
}

export const actions = {
	favorite: async (event) => {
		await api.favoriteAlbum(event.params.id, event.locals.userId);
		return {
			success: true
		};
	},
	unfavorite: async (event) => {
		await api.unfavoriteAlbum(event.params.id, event.locals.userId);
		return {
			success: true
		};
	}
};
