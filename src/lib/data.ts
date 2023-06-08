import type { Album } from '$lib/types';

// selections from https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/
// images from Wikipedia
export const HIGHLIGHTED_RELEASES: Album[] = [
	{
		title: "Marvin Gaye - What's Going On",
		url: '/album/66631',
		imageUrl: "/covers/MarvinGayeWhat'sGoingOnalbumcover.jpg",
		year: 1971,
		id: 66631
	},
	{
		title: 'The Beach Boys - Pet Sounds',
		url: '/album/17217',
		imageUrl: '/covers/PetSoundsCover.jpg',
		year: 1966,
		id: 17217
	},
	{
		title: 'Joni Mitchell - Blue',
		url: '/album/47744',
		imageUrl: '/covers/Bluealbumcover.jpg',
		year: 1971,
		id: 47744
	},
	{
		title: 'Stevie Wonder - Songs In The Key Of Life',
		url: '/album/87440',
		imageUrl: '/covers/Songs_in_the_key_of_life.jpg',
		year: 1976,
		id: 87440
	},
	{
		title: 'The Beatles - Abbey Road',
		url: '/album/24047',
		imageUrl: '/covers/Beatles_-_Abbey_Road.jpg',
		year: 1969,
		id: 24047
	},
	{
		title: 'Fleetwood Mac - Rumours',
		url: '/album/38722',
		imageUrl: '/covers/FMacRumours.png',
		year: 1977,
		id: 38722
	},
	{
		title: 'Prince - Purple Rain',
		url: '/album/16245',
		imageUrl: '/covers/Princepurplerain.jpg',
		year: 1984,
		id: 16245
	},
	{
		title: 'Bob Dylan - Blood On The Tracks',
		url: '/album/3878',
		imageUrl: '/covers/Bob_Dylan_-_Blood_on_the_Tracks.jpg',
		year: 1975,
		id: 3878
	},
	{
		title: 'Lauryn Hill - The Miseducation Of Lauryn Hill',
		url: '/album/57279',
		imageUrl: '/covers/LaurynHillTheMiseducationofLaurynHillalbumcover.jpg',
		year: 1998,
		id: 57279
	},
	{
		title: 'Aretha Franklin - I Never Loved a Man the Way I Love You',
		url: '/album/122933',
		imageUrl: '/covers/Aretha_Franklin_–_I_Never_Loved_a_Man_the_Way_I_Love_You.jpg',
		year: 1967,
		id: 122933
	}
];
