import api from '$lib/api';

export async function load({ params, url, setHeaders }) {
	const page = url.searchParams.get('page') ?? 1;
	// TODO: this is needed to prevent unhandled promise rejections: https://github.com/sveltejs/kit/issues/9785
	const releases = api.getMasterReleasesForArtist(params.id, page).catch(() => null);
	const artistDetails = await api.getArtist(params.id);
	setHeaders({
		'Cache-Control': 'public, max-age=60'
	});
	return {
		detail: artistDetails,
		streamed: {
			releases
		},
		title: artistDetails.name
	};
}
