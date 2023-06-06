import api from '$lib/api';
import { redirect } from '@sveltejs/kit';

export function load({ locals, depends }) {
	depends('app:favorites');
	if (!locals.userId) throw redirect(302, '/login');
	return {
		favorites: api.getFavoriteAlbumDetails(locals.userId)
	};
}
