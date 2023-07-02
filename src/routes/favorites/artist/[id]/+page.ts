import { redirect } from '@sveltejs/kit';

export async function load({ parent, params, depends }) {
	const parentData = await parent();
	depends('app:favorites'); // re-run this when favorites change
	const albums = parentData.favorites.getArtistAlbums(params.id);
	if (albums.length === 0) throw redirect(302, '/favorites');

	return {
		title: 'Favorites - ' + albums[0].mainArtist.name,
		id: params.id,
		groupBy: 'artist',
		albums
	};
}
