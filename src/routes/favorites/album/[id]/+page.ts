import { error } from '@sveltejs/kit';

export async function load({ parent, params, depends }) {
	const parentData = await parent();
	depends('app:favorites'); // re-run this when favorites change
	const album = parentData.favorites.get(params.id);
	if (!album)
		throw error(404, {
			message: 'Album not found'
		});

	return {
		album,
		title: 'Favorites - ' + album.title,
		id: params.id,
		groupBy: 'album'
	};
}
