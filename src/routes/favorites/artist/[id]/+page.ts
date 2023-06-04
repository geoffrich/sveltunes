import { redirect } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const parentData = await parent();
	const albums = parentData.favorites.filter((f) => f.mainArtist.id.toString() === params.id);
	if (albums.length === 0) throw redirect(302, '/favorites');

	return {
		albums,
		title: 'Favorites - ' + albums[0].mainArtist.name,
		id: params.id,
		groupBy: 'artist'
	};
}
