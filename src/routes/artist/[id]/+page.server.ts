import api from '$lib/api';

export function load({ params, url }) {
	const page = url.searchParams.get('page') ?? 1;
	// TODO: way to not refetch the artist when paginating?
	return {
		detail: api.getArtist(params.id),
		streamed: {
			// TODO: figure out if there's a better way
			releases: api.getMasterReleasesForArtist(params.id, page).catch(() => null)
		}
	};
}
