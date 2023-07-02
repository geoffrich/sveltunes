import { createFavoritesStore } from '$lib/favorites.js';

export function load({ data }) {
	return {
		...data,
		favorites: createFavoritesStore(data.favorites.sort((a, b) => a.title.localeCompare(b.title)))
	};
}
