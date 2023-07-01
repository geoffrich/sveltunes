import { createFavoritesStore } from '$lib/favorites.js';

export const load = ({ data }) => {
	return {
		...data,
		favorites: createFavoritesStore(data.favorites)
	};
};
