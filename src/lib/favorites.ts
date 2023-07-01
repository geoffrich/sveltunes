import { type Writable, writable, type Updater } from 'svelte/store';
import type { AlbumDetail } from './types';

export interface FavoritesStore extends Writable<AlbumDetail[]> {
	remove: (id: number) => () => void;
	get: (albumId: string) => AlbumDetail | undefined;
	getArtistAlbums: (artistId: string) => AlbumDetail[];
}

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
		_store.update(fn);
	};

	const store = {
		subscribe,
		set,
		update,
		remove: (id: number) => {
			// TODO: preserve order on undo
			const toRemove = _favorites.find((f) => f.id === id);
			if (!toRemove)
				return () => {
					/* noop */
				};
			update((favorites) => favorites.filter((f) => f !== toRemove));
			// return a function to undo the removal
			return () => {
				update((favorites) => [...favorites, toRemove]);
			};
		},
		get: (albumId: string) => {
			return _favorites.find((f) => f.id.toString() === albumId);
		},
		getArtistAlbums: (artistId: string) => {
			return _favorites.filter((f) => f.mainArtist.id.toString() === artistId);
		}
	};
	return store;
}
