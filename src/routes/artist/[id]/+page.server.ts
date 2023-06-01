import api from '$lib/api';

export async function load({ params, url }) {
	const page = url.searchParams.get('page') ?? 1;
	const detail = await api.getArtist(params.id);
	// TODO: way to not refetch the artist when paginating?
	return {
		detail,
		streamed: {
			// TODO: figure out if there's a better way
			releases: api.getMasterReleasesForArtist(params.id, page).catch(() => null)
		},
		title: detail.name
	};
}
