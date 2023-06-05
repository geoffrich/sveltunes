import api from '$lib/api';

export function load({ locals, depends }) {
	depends('app:favorites');
	return {
		isLoggedIn: !!locals.userId,
		favoriteAlbumIds: api.getFavoriteAlbumIds(locals.userId)
	};
}
