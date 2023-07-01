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
		_store.set(_favorites);
	};

	const store = {
		subscribe,
		set,
		update,
		remove: (id: number) => {
			console.log('removing id', id);
			const toRemove = _favorites.findIndex((f) => f.id === id);
			if (toRemove === -1)
				return () => {
					/* noop */
				};
			const [removed] = _favorites.splice(toRemove, 1);
			set(_favorites);
			console.log({ removed, toRemove, _favorites });
			// return a function to undo the removal
			return () => {
				update((favorites) => {
					favorites.splice(toRemove, 0, removed);
					return favorites;
				});
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