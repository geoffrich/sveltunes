import { DISCOGS_CONSUMER_KEY, DISCOGS_CONSUMER_SECRET } from '$env/static/private';

const DISCOGS_BASE_URL = 'https://api.discogs.com';

interface SearchResponse {
	pagination: Pagination;
	results: SearchResult[];
}

/**
 * Interface for getting pagination from Discogs results
 * Example: {
    "per_page": 3,
    "pages": 66,
    "page": 1,
    "urls": {
      "last": "http://api.discogs.com/database/search?per_page=3&artist=nirvana&release_title=nevermind&page=66",
      "next": "http://api.discogs.com/database/search?per_page=3&artist=nirvana&release_title=nevermind&page=2"
    },
    "items": 198
  },
 */
interface Pagination {
	per_page: number;
	pages: number;
	page: number;
	urls: {
		last: string;
		next: string;
	};
	items: number;
}

/**
 * Interface for the result of calling Discogs' search endpoint.
 * Example: {
    country: 'US',
    genre: [ 'Rock' ],
    format: [ 'Vinyl', 'LP', 'Album', 'Reissue', 'Stereo' ],
    style: [ 'Punk' ],
    id: 641537,
    label: [
        'Epic',
        'Epic',
        'CBS Records',
        'CBS Records',
        'Epic Records',
        'CBS Inc.'
    ],
    type: 'release',
    barcode: [
        '0746436060102',
        '0 74643 60601 02',
        'AL 36060',
        'BL 36060',
        '<P AP> AL-36060 GID 3',
        '<P AP> BL-36060 GIF 3',
        '<P AP> AL-36060 GID',
        '<P AP> BL-36060 GIF I'
    ],
    master_id: 24371,
    master_url: 'https://api.discogs.com/masters/24371',
    uri: '/release/641537-The-Clash-The-Clash',
    catno: 'PE 36060',
    title: 'The Clash - The Clash',
    thumb: 'https://i.discogs.com/XWb3hg9d9BVAhFSGwPkIEqWk6ZhjCMn4B3bqnCydrbc/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY0MTUz/Ny0xNDEyODM5NDk1/LTY3NDcuanBlZw.jpeg',
    cover_image: 'https://i.discogs.com/xxBmc1uOtcI45SMhJGT5yku0L-VBxDfM-mXnOh84cWw/rs:fit/g:sm/q:90/h:593/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTY0MTUz/Ny0xNDEyODM5NDk1/LTY3NDcuanBlZw.jpeg',
    resource_url: 'https://api.discogs.com/releases/641537',
    community: { want: 580, have: 1970 },
    format_quantity: 1,
    formats: [ { name: 'Vinyl', qty: '1', descriptions: [Array] } ]
}
 */
interface SearchResult {
	style: string[];
	thumb: string;
	title: string;
	country: string;
	format: string[];
	uri: string;
	community: {
		want: number;
		have: number;
	};
	label: string[];
	catno: string;
	year: string;
	genre: string[];
	resource_url: string;
	type: string;
	id: number;
	barcode: string[];
	master_id: number;
	master_url: string;
	cover_image: string;
	format_quantity: number;
	formats: {
		name: string;
		qty: string;
		descriptions: string[];
	}[];
}

/**
 * Example: {
  "created_ts": "2016-05-31T10:36:30-07:00",
  "modified_ts": "2016-05-31T13:46:12-07:00",
  "name": "new list",
  "list_id": 2,
  "url": "https://www.discogs.com/lists/new-list/2",
  "items": [
    {
      "comment": "My list comment",
      "display_title": "Silent Phase - The Rewired Mixes",
      "uri": "https://www.discogs.com/Silent-Phase-The-Rewired-Mixes/release/4674",
      "image_url": "https://api-img.discogs.com/-06gF81ykx-Ok1PCpNR7B7Rt_Dc=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-3227-1132807172.jpeg.jpg",
      "resource_url": "https://api.discogs.com/releases/4674",
      "type": "release",
      "id": 4674
    },
    {
      "comment": "item comment",
      "display_title": "Various - Artificial Intelligence II",
      "uri": "https://www.discogs.com/Various-Artificial-Intelligence-II/release/2964",
      "image_url": "http://api-img.discogs.com/euixsynJwQxJelre_kQNV-ZtX0Y=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-2964-1215444984.jpeg.jpg",
      "resource_url": "https://api.discogs.com/releases/2964",
      "type": "release",
      "id": 2964
    },
    {
      "comment": "This is an artist",
      "display_title": "Silent Phase",
      "uri": "https://www.discogs.com/artist/3227-Silent-Phase",
      "image_url": "http://api-img.discogs.com/-06gF81ykx-Ok1PCpNR7B7Rt_Dc=/300x300/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-3227-1132807172.jpeg.jpg",
      "resource_url": "https://api.discogs.com/artists/3227",
      "type": "artist",
      "id": 3227
    }
  ],
  "resource_url": "https://api.discogs.com/lists/2",
  "public": false,
  "description": "What a cool list!"
}
 */
interface ListResponse {
	created_ts: string;
	modified_ts: string;
	name: string;
	list_id: number;
	url: string;
	items: {
		comment: string;
		display_title: string;
		uri: string;
		image_url: string;
		resource_url: string;
		type: string;
		id: number;
	}[];
	resource_url: string;
	public: boolean;
	description: string;
}

/**
 * Example: {
  "styles": [
    "Goa Trance"
  ],
  "genres": [
    "Electronic"
  ],
  "videos": [
    {
      "duration": 421,
      "description": "Electric Universe - Alien Encounter Part 2 (Spirit Zone 97)",
      "embed": true,
      "uri": "https://www.youtube.com/watch?v=n1LGinzMDi8",
      "title": "Electric Universe - Alien Encounter Part 2 (Spirit Zone 97)"
    }
  ],
  "title": "Stardiver",
  "main_release": 66785,
  "main_release_url": "https://api.discogs.com/releases/66785",
  "uri": "https://www.discogs.com/Electric-Universe-Stardiver/master/1000",
  "artists": [
    {
      "join": "",
      "name": "Electric Universe",
      "anv": "",
      "tracks": "",
      "role": "",
      "resource_url": "https://api.discogs.com/artists/21849",
      "id": 21849
    }
  ],
  "versions_url": "https://api.discogs.com/masters/1000/versions",
  "year": 1997,
  "images": [
    {
      "height": 569,
      "resource_url": "https://api-img.discogs.com/_0K5t_iLs6CzLPKTB4mwHVI3Vy0=/fit-in/600x569/filters:strip_icc():format(jpeg):mode_rgb():quality(96)/discogs-images/R-66785-1213949871.jpeg.jpg",
      "type": "primary",
      "uri": "https://api-img.discogs.com/_0K5t_iLs6CzLPKTB4mwHVI3Vy0=/fit-in/600x569/filters:strip_icc():format(jpeg):mode_rgb():quality(96)/discogs-images/R-66785-1213949871.jpeg.jpg",
      "uri150": "https://api-img.discogs.com/sSWjXKczZseDjX2QohG1Lc77F-w=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb()/discogs-images/R-66785-1213949871.jpeg.jpg",
      "width": 600
    },
    {
      "height": 296,
      "resource_url": "https://api-img.discogs.com/1iD31iOWgfgb2DpROI4_MvmceFw=/fit-in/600x296/filters:strip_icc():format(jpeg):mode_rgb():quality(96)/discogs-images/R-66785-1213950065.jpeg.jpg",
      "type": "secondary",
      "uri": "https://api-img.discogs.com/1iD31iOWgfgb2DpROI4_MvmceFw=/fit-in/600x296/filters:strip_icc():format(jpeg):mode_rgb():quality(96)/discogs-images/R-66785-1213950065.jpeg.jpg",
      "uri150": "https://api-img.discogs.com/Cm4Q_1S784pQeRfwa0lN2jsj47Y=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb()/discogs-images/R-66785-1213950065.jpeg.jpg",
      "width": 600
    }
  ],
  "resource_url": "https://api.discogs.com/masters/1000",
  "tracklist": [
    {
      "duration": "7:00",
      "position": "1",
      "type_": "track",
      "title": "Alien Encounter (Part 2)"
    },
    {
      "duration": "7:13",
      "position": "2",
      "type_": "track",
      "extraartists": [
        {
          "join": "",
          "name": "DJ Sangeet",
          "anv": "",
          "tracks": "",
          "role": "Written-By, Producer",
          "resource_url": "https://api.discogs.com/artists/25460",
          "id": 25460
        }
      ],
      "title": "From The Heart"
    },
    {
      "duration": "6:45",
      "position": "3",
      "type_": "track",
      "title": "Radio S.P.A.C.E."
    }
  ],
  "id": 1000,
  "num_for_sale": 9,
  "lowest_price": 9.36,
  "data_quality": "Correct"
}
 */
interface MasterRelease {
	styles: string[];
	genres: string[];
	videos: {
		duration: number;
		description: string;
		embed: boolean;
		uri: string;
		title: string;
	}[];
	title: string;
	main_release: number;
	main_release_url: string;
	uri: string;
	artists: {
		join: string;
		name: string;
		anv: string;
		tracks: string;
		role: string;
		resource_url: string;
		id: number;
	}[];
	versions_url: string;
	year: number;
	images: {
		height: number;
		resource_url: string;
		type: string;
		uri: string;
		uri150: string;
		width: number;
	}[];
	resource_url: string;
	tracklist: {
		duration: string;
		position: string;
		type_: string;
		title: string;
		extraartists?: {
			join: string;
			name: string;
			anv: string;
			tracks: string;
			role: string;
			resource_url: string;
			id: number;
		}[];
	}[];
	id: number;
	num_for_sale: number;
	lowest_price: number;
	data_quality: string;
}

interface Album {
	title: string;
	url: string;
	imageUrl: string;
}

interface AlbumDetail {
	title: string;
	mainArtist: {
		name: string;
		url: string;
	};
	otherArtists: {
		name: string;
		url: string;
	}[];
	imageUrl: string;
	year: number;
	genres: string[];
	styles: string[];
	tracks: {
		title: string;
		duration: string;
	}[];
}

function adaptSearchResult(result: SearchResult): Album {
	return {
		title: result.title,
		url: 'https://www.discogs.com' + result.uri,
		imageUrl: result.cover_image
	};
}

function adaptListItem(item: ListResponse['items'][0]): Album {
	return {
		title: item.display_title,
		url: item.uri,
		imageUrl: item.image_url
	};
}

function adaptMasterRelease(release: MasterRelease): AlbumDetail {
	return {
		title: release.title,
		mainArtist: {
			name: release.artists[0].name,
			url: release.artists[0].resource_url
		},
		otherArtists: release.artists.map((artist) => ({
			name: artist.name,
			url: artist.resource_url
		})),
		imageUrl: release.images[0].uri,
		year: release.year,
		genres: release.genres,
		styles: release.styles,
		tracks: release.tracklist.map((track) => ({
			title: track.title,
			duration: track.duration
		}))
	};
}

export default {
	getReleasesForYear: async (year: number, maxReleases = 10) => {
		const response = await callDiscogsWithAuth(`/database/search?year=${year}&type=master`);
		const parsed: SearchResponse = await response.json();
		return parsed.results
			.sort((a, b) => b.community.have - a.community.have)
			.map(adaptSearchResult)
			.slice(0, maxReleases);
	},
	// hardcode this list, since there's not a good api endpoint to use
	getHighlightedReleases: () => {
		return HIGHLIGHTED_RELEASES;
	},
	getMasterRelease: async (id: string) => {
		const response = await callDiscogsWithAuth(`/masters/${id}`);
		const parsed: MasterRelease = await response.json();
		return adaptMasterRelease(parsed);
	}
};

function callDiscogsWithAuth(url: string) {
	return fetch(new URL(url, DISCOGS_BASE_URL), {
		headers: {
			Authorization: 'Discogs key=' + DISCOGS_CONSUMER_KEY + ', secret=' + DISCOGS_CONSUMER_SECRET
		}
	});
}

// selections from https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/
// images from Wikipedia
const HIGHLIGHTED_RELEASES: Album[] = [
	{
		title: "Marvin Gaye - What's Going On",
		url: '/album/66631',
		imageUrl: "/covers/MarvinGayeWhat'sGoingOnalbumcover.jpg"
	},
	{
		title: 'The Beach Boys - Pet Sounds',
		url: '/album/17217',
		imageUrl: '/covers/PetSoundsCover.jpg'
	},
	{
		title: 'Joni Mitchell - Blue',
		url: '/album/47744',
		imageUrl: '/covers/Bluealbumcover.jpg'
	},
	{
		title: 'Stevie Wonder - Songs In The Key Of Life',
		url: '/album/87440',
		imageUrl: '/covers/Songs_in_the_key_of_life.jpg'
	},
	{
		title: 'The Beatles - Abbey Road',
		url: '/album/24047',
		imageUrl: '/covers/Beatles_-_Abbey_Road.jpg'
	},
	{
		title: 'Fleetwood Mac - Rumours',
		url: '/album/38722',
		imageUrl: '/covers/FMacRumours.png'
	},
	{
		title: 'Prince - Purple Rain',
		url: '/album/16245',
		imageUrl: '/covers/Princepurplerain.jpg'
	},
	{
		title: 'Bob Dylan - Blood On The Tracks',
		url: '/album/3878',
		imageUrl: '/covers/Bob_Dylan_-_Blood_on_the_Tracks.jpg'
	},
	{
		title: 'Lauryn Hill - The Miseducation Of Lauryn Hill',
		url: '/album/57279',
		imageUrl: '/covers/LaurynHillTheMiseducationofLaurynHillalbumcover.jpg'
	},
	{
		title: 'Aretha Franklin - I Never Loved a Man the Way I Love You',
		url: '/album/122933',
		imageUrl: '/covers/Aretha_Franklin_–_I_Never_Loved_a_Man_the_Way_I_Love_You.jpg'
	}
];
