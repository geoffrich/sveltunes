import api from '$lib/api';

export function load({ locals, depends }) {
	depends('app:favorites');
	return {
		favorites: api.getFavoriteAlbumDetails(locals.userId)
	};
}
