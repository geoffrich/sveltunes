import { DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { Album, AlbumDetail, ArtistDetail, SearchResult } from './types';
import type {
	ArtistReleasesResponse,
	ArtistResponse,
	DiscogsSearchResult,
	MasterRelease,
	SearchResponse
} from './discogs';
import { delay } from './util';
import { LRUCache } from 'lru-cache';
import { HIGHLIGHTED_RELEASES } from './data';

const DISCOGS_BASE_URL = 'https://api.discogs.com';

interface DB {
	[key: string]: {
		favorites: string[];
	};
}

// temporary in-memory db
const db: DB = {
	123: {
		favorites: ['66631', '17217', '38722', '38682', '502470']
	}
};

const albumCache = new LRUCache<string, AlbumDetail>({
	max: 500
});

const artistCache = new LRUCache<string, ArtistDetail>({
	max: 500
});

function adaptSearchResult(result: DiscogsSearchResult): SearchResult {
	return {
		title: result.title,
		url: result.type === 'master' ? `/album/${result.id}` : `/artist/${result.id}`,
		imageUrl: result.thumb || result.cover_image,
		year: result.year,
		id: result.id
	};
}

function adaptMasterRelease(release: MasterRelease): AlbumDetail {
	return {
		id: release.id,
		title: release.title,
		url: `/album/${release.id}`,
		mainArtist: {
			name: release.artists?.[0].name,
			url: `/artist/${release.artists?.[0].id}`,
			id: release.artists?.[0].id
		},
		otherArtists: release.artists?.slice(1).map((artist) => ({
			name: artist.name,
			url: artist.resource_url
		})),
		imageUrl: release.images?.[0].uri,
		thumbnailUrl: release.images?.[0].uri150,
		year: release.year,
		genres: release.genres,
		styles: release.styles,
		tracks:
			release.tracklist
				?.filter((t) => t.type_ !== 'heading')
				.map((track) => ({
					title: track.title,
					duration: track.duration,
					artists:
						track.artists?.map((a) => ({
							name: a.name,
							url: `/artist/${a.id}`
						})) ?? []
				})) ?? []
	};
}

function adaptArtist(artist: ArtistResponse): ArtistDetail {
	return {
		name: artist.name,
		description: artist.profile,
		image: {
			url: artist.images?.[0].uri,
			width: artist.images?.[0].width,
			height: artist.images?.[0].height
		},
		members: artist.members?.map((member) => ({
			name: member.name,
			url: `/artist/${member.id}`
		}))
	};
}

function adaptArtistReleases(response: ArtistReleasesResponse): Album[] {
	return (
		response.releases?.map((release) => ({
			title: release.title,
			// we can only link to master releases for now
			url: release.type === 'master' ? `/album/${release.id}` : '',
			imageUrl: release.thumb,
			year: release.year,
			id: release.id
		})) ?? []
	);
}

const getMasterRelease = async (id: string) => {
	const cached = albumCache.get(id);
	if (cached) {
		console.log('Found album', id, 'in cache');
		return cached;
	}
	console.log('Fetching album id', id);
	const response = await callDiscogsWithAuth(`/masters/${id}`);
	const parsed: MasterRelease = await response.json();
	const adapted = adaptMasterRelease(parsed);
	albumCache.set(id, adapted);
	return adapted;
};

export default {
	// hardcode this list, since there's not a good api endpoint to use
	getHighlightedReleases: () => {
		return HIGHLIGHTED_RELEASES;
	},
	getMasterRelease,
	getArtist: async (id: string) => {
		const cached = artistCache.get(id);
		if (cached) {
			console.log('Found artist', id, 'in cache');
			return cached;
		}
		console.log('Fetching artist id', id);
		const response = await callDiscogsWithAuth(`/artists/${id}`);
		const parsed: ArtistResponse = await response.json();
		const adapted = adaptArtist(parsed);
		artistCache.set(id, adapted);
		return adapted;
	},
	getMasterReleasesForArtist: async (artistId: string, page: number | string) => {
		const response = await callDiscogsWithAuth(`/artists/${artistId}/releases?page=${page}`);
		const parsed: ArtistReleasesResponse = await response.json();
		return {
			list: adaptArtistReleases(parsed),
			pagination: {
				page: parsed.pagination?.page ?? 1,
				pages: parsed.pagination?.pages ?? 0
			}
		};
	},
	getSearchResults: async (query: string, type?: string) => {
		const response = await callDiscogsWithAuth(`/database/search?q=${query}&type=${type}`);
		const parsed: SearchResponse = await response.json();
		return parsed.results.map(adaptSearchResult);
	},
	favoriteAlbum: async (id: string, userId: number) => {
		db[userId] = db[userId] ?? {};
		db[userId].favorites = db[userId].favorites ?? [];
		if (db[userId].favorites.includes(id)) {
			return;
		}
		db[userId].favorites.push(id);
		await delay(500);
	},
	unfavoriteAlbum: async (id: string, userId: number) => {
		db[userId] = db[userId] ?? {};
		db[userId].favorites = db[userId].favorites ?? [];
		db[userId].favorites = db[userId].favorites.filter((favId) => favId !== id);
		await delay(500);
	},
	isAlbumFavorited: async (id: string, userId: number) => {
		return db[userId]?.favorites?.includes(id) ?? false;
	},
	getFavoriteAlbumIds: async (userId: number) => {
		return db[userId]?.favorites ?? [];
	},
	getFavoriteAlbumDetails: async (userId: number) => {
		const ids = db[userId]?.favorites ?? [];
		const details = await Promise.all(ids.map((id) => getMasterRelease(id)));
		return details;
	}
};

async function callDiscogsWithAuth(url: string) {
	const response = await fetch(new URL(url, DISCOGS_BASE_URL), {
		headers: {
			Authorization: 'Discogs key=' + DISCOGS_CONSUMER_KEY + ', secret=' + DISCOGS_CONSUMER_SECRET
		}
	});

	if (!response.ok) {
		console.log('Non-ok response from Discogs:', response.status, response.statusText);
		if (response.status === 404) {
			throw error(404, 'Not found');
		} else if (response.status === 429) {
			throw error(429, 'Discogs rate limit hit');
		} else {
			throw error(500, 'Something went wrong');
		}
	}

	return response;
}
