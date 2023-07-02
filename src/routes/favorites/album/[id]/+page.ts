import { error } from '@sveltejs/kit';

export async function load(event) {
	const { parent, params } = event;
	const parentData = await parent();
	const album = parentData.favorites.get(params.id);
	parentData.favorites.rerunWhenFavoritesChange(event);
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
