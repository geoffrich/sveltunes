import api from '$lib/api';

export async function load({ url }) {
	const search = url.searchParams.get('search') ?? '';
	const type = url.searchParams.get('type') ?? 'master';
	const results = search ? await api.getSearchResults(search, type) : null;
	return {
		results,
		search,
		type
	};
}
