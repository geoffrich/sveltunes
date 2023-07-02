import { createFavoritesStore } from '$lib/favorites.js';

export const load = ({ data }) => {
	return {
		...data,
		favorites: createFavoritesStore(data.favorites.sort((a, b) => a.title.localeCompare(b.title)))
	};
};
