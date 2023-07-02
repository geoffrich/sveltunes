import { writable, type Updater } from 'svelte/store';
import type { AlbumDetail } from './types';
import type { LoadEvent } from '@sveltejs/kit';
import { invalidate } from '$app/navigation';

const INVALIDATION_KEY = 'app:favorites';

export function createFavoritesStore(favorites: AlbumDetail[]) {
	const _store = writable(favorites);
	let _favorites = favorites;
	const subscribe = _store.subscribe;
	const set = (newFavorites: AlbumDetail[]) => {
		_favorites = newFavorites;
		_store.set(newFavorites);
	};
	const update = (fn: Updater<AlbumDetail[]>) => {
		_favorites = fn(_favorites);
		_store.set(_favorites);
	};

	const store = {
		subscribe,
		remove: async (id: number) => {
			const toRemove = _favorites.findIndex((f) => f.id === id);
			if (toRemove === -1)
				return () => {
					/* noop */
				};
			const [removed] = _favorites.splice(toRemove, 1);
			set(_favorites);
			await invalidate(INVALIDATION_KEY);
			// return a function to undo the removal
			return async () => {
				update((favorites) => {
					favorites.splice(toRemove, 0, removed);
					return favorites;
				});
				await invalidate(INVALIDATION_KEY);
			};
		},
		get: (albumId: string) => {
			return _favorites.find((f) => f.id.toString() === albumId);
		},
		getArtistAlbums: (artistId: string) => {
			return _favorites.filter((f) => f.mainArtist.id.toString() === artistId);
		},
		rerunWhenFavoritesChange: (event: LoadEvent) => {
			event.depends(INVALIDATION_KEY);
		}
	};
	return store;
}
