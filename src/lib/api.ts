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

const DISCOGS_BASE_URL = 'https://api.discogs.com';

interface DB {
	[key: string]: {
		favorites: string[];
	};
}

// temporary in-memory db
const db: DB = {
	123: {
		favorites: ['66631', '17217', '38722']
	}
};

function adaptSearchResult(result: DiscogsSearchResult): SearchResult {
	return {
		title: result.title,
		url: result.type === 'master' ? `/album/${result.id}` : `/artist/${result.id}`,
		imageUrl: result.thumb || result.cover_image,
		year: result.year
	};
}

function adaptMasterRelease(release: MasterRelease): AlbumDetail {
	return {
		id: release.id,
		title: release.title,
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
			year: release.year
		})) ?? []
	);
}

const getMasterRelease = async (id: string) => {
	const response = await callDiscogsWithAuth(`/masters/${id}`);
	const parsed: MasterRelease = await response.json();
	return adaptMasterRelease(parsed);
};

export default {
	// hardcode this list, since there's not a good api endpoint to use
	getHighlightedReleases: () => {
		return HIGHLIGHTED_RELEASES;
	},
	getMasterRelease,
	getArtist: async (id: string) => {
		const response = await callDiscogsWithAuth(`/artists/${id}`);
		const parsed: ArtistResponse = await response.json();
		return adaptArtist(parsed);
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
	},
	unfavoriteAlbum: async (id: string, userId: number) => {
		db[userId] = db[userId] ?? {};
		db[userId].favorites = db[userId].favorites ?? [];
		db[userId].favorites = db[userId].favorites.filter((favId) => favId !== id);
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

	if (response.status === 404) {
		throw error(404, 'Not found');
	}

	return response;
}

// selections from https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/
// images from Wikipedia
const HIGHLIGHTED_RELEASES: Album[] = [
	{
		title: "Marvin Gaye - What's Going On",
		url: '/album/66631',
		imageUrl: "/covers/MarvinGayeWhat'sGoingOnalbumcover.jpg",
		year: 1971
	},
	{
		title: 'The Beach Boys - Pet Sounds',
		url: '/album/17217',
		imageUrl: '/covers/PetSoundsCover.jpg',
		year: 1966
	},
	{
		title: 'Joni Mitchell - Blue',
		url: '/album/47744',
		imageUrl: '/covers/Bluealbumcover.jpg',
		year: 1971
	},
	{
		title: 'Stevie Wonder - Songs In The Key Of Life',
		url: '/album/87440',
		imageUrl: '/covers/Songs_in_the_key_of_life.jpg',
		year: 1976
	},
	{
		title: 'The Beatles - Abbey Road',
		url: '/album/24047',
		imageUrl: '/covers/Beatles_-_Abbey_Road.jpg',
		year: 1969
	},
	{
		title: 'Fleetwood Mac - Rumours',
		url: '/album/38722',
		imageUrl: '/covers/FMacRumours.png',
		year: 1977
	},
	{
		title: 'Prince - Purple Rain',
		url: '/album/16245',
		imageUrl: '/covers/Princepurplerain.jpg',
		year: 1984
	},
	{
		title: 'Bob Dylan - Blood On The Tracks',
		url: '/album/3878',
		imageUrl: '/covers/Bob_Dylan_-_Blood_on_the_Tracks.jpg',
		year: 1975
	},
	{
		title: 'Lauryn Hill - The Miseducation Of Lauryn Hill',
		url: '/album/57279',
		imageUrl: '/covers/LaurynHillTheMiseducationofLaurynHillalbumcover.jpg',
		year: 1998
	},
	{
		title: 'Aretha Franklin - I Never Loved a Man the Way I Love You',
		url: '/album/122933',
		imageUrl: '/covers/Aretha_Franklin_–_I_Never_Loved_a_Man_the_Way_I_Love_You.jpg',
		year: 1967
	}
];
