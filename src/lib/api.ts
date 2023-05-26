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

interface Album {
	title: string;
	url: string;
	imageUrl: string;
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
		url: 'https://www.discogs.com/master/66631-Marvin-Gaye-Whats-Going-On',
		imageUrl: "/covers/MarvinGayeWhat'sGoingOnalbumcover.jpg"
	},
	{
		title: 'The Beach Boys - Pet Sounds',
		url: 'https://www.discogs.com/master/17217-The-Beach-Boys-Pet-Sounds',
		imageUrl: '/covers/PetSoundsCover.jpg'
	},
	{
		title: 'Joni Mitchell - Blue',
		url: 'https://www.discogs.com/master/47744-Joni-Mitchell-Blue',
		imageUrl: '/covers/Bluealbumcover.jpg'
	},
	{
		title: 'Stevie Wonder - Songs In The Key Of Life',
		url: 'https://www.discogs.com/master/87440-Stevie-Wonder-Songs-In-The-Key-Of-Life',
		imageUrl: '/covers/Songs_in_the_key_of_life.jpg'
	},
	{
		title: 'The Beatles - Abbey Road',
		url: 'https://www.discogs.com/master/24047-The-Beatles-Abbey-Road',
		imageUrl: '/covers/Beatles_-_Abbey_Road.jpg'
	},
	{
		title: 'Fleetwood Mac - Rumours',
		url: 'https://www.discogs.com/master/38722-Fleetwood-Mac-Rumours',
		imageUrl: '/covers/FMacRumours.png'
	},
	{
		title: 'Prince - Purple Rain',
		url: 'https://www.discogs.com/master/16245-Prince-And-The-Revolution-Purple-Rain',
		imageUrl: '/covers/Princepurplerain.jpg'
	},
	{
		title: 'Bob Dylan - Blood On The Tracks',
		url: 'https://www.discogs.com/master/3878-Bob-Dylan-Blood-On-The-Tracks',
		imageUrl: '/covers/Bob_Dylan_-_Blood_on_the_Tracks.jpg'
	},
	{
		title: 'Lauryn Hill - The Miseducation Of Lauryn Hill',
		url: 'https://www.discogs.com/master/57279-Lauryn-Hill-The-Miseducation-Of-Lauryn-Hill',
		imageUrl: '/covers/LaurynHillTheMiseducationofLaurynHillalbumcover.jpg'
	},
	{
		title: 'Aretha Franklin - I Never Loved a Man the Way I Love You',
		url: 'https://www.discogs.com/master/122933-Aretha-Franklin-I-Never-Loved-A-Man-The-Way-I-Love-You',
		imageUrl: '/covers/Aretha_Franklin_–_I_Never_Loved_a_Man_the_Way_I_Love_You.jpg'
	}
];
