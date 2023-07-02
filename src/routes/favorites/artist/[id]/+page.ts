import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const { parent, params } = event;
	const parentData = await parent();
	const albums = parentData.favorites.getArtistAlbums(params.id);
	parentData.favorites.rerunWhenFavoritesChange(event);
	if (albums.length === 0) throw redirect(302, '/favorites');

	return {
		title: 'Favorites - ' + albums[0].mainArtist.name,
		id: params.id,
		groupBy: 'artist',
		albums
	};
}
