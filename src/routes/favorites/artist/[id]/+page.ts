import { invalidate } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

const dependencyUrl = 'app:artist:favorites';

export async function load({ parent, params, depends }) {
	const parentData = await parent();
	depends(dependencyUrl);
	const albums = parentData.favorites.getArtistAlbums(params.id);
	if (albums.length === 0) throw redirect(302, '/favorites');

	return {
		title: 'Favorites - ' + albums[0].mainArtist.name,
		id: params.id,
		groupBy: 'artist',
		albums,
		invalidate: () => invalidate(dependencyUrl)
	};
}
