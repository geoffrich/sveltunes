import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const parentData = await parent();
	const albums = parentData.favorites.filter((f) => f.mainArtist.id.toString() === params.id);
	if (albums.length === 0)
		throw error(404, {
			message: 'Artist not found'
		});

	return {
		albums
	};
}
