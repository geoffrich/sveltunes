export interface Album {
	title: string;
	url: string;
	imageUrl: string;
	year?: string | number;
	id: number;
}

export interface AlbumDetail {
	id: number;
	title: string;
	mainArtist: {
		name: string;
		url: string;
		id: number;
	};
	otherArtists: {
		name: string;
		url: string;
	}[];
	imageUrl: string;
	thumbnailUrl: string;
	year: number;
	genres: string[];
	styles: string[];
	tracks: Track[];
	url: string;
}

export interface Track {
	title: string;
	duration: string;
	artists: {
		name: string;
		url: string;
	}[];
}

export interface ArtistDetail {
	name: string;
	description: string;
	image: {
		url: string;
		width: number;
		height: number;
	};
	members: {
		name: string;
		url: string;
	}[];
}

export interface SearchResult {
	title: string;
	url: string;
	imageUrl: string;
	year?: string | number;
}
