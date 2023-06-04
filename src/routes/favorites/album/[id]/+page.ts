import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const parentData = await parent();
	const album = parentData.favorites.find((f) => f.id.toString() === params.id);
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
