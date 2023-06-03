import api from '$lib/api';

export function load({ locals }) {
	return {
		favorites: api.getFavoriteAlbumDetails(locals.userId)
	};
}
