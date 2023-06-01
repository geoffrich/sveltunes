import api from '$lib/api';

export function load() {
	return {
		releases: api.getHighlightedReleases(),
		title: 'Home'
	};
}
