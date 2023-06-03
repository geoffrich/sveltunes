import api from '$lib/api';

export function load({ locals }) {
	return {
		isLoggedIn: !!locals.userId,
		favoriteAlbumIds: api.getFavoriteAlbumIds(locals.userId)
	};
}
