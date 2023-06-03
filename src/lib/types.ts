export interface Album {
	title: string;
	url: string;
	imageUrl: string;
	year?: string | number;
}

export interface AlbumDetail {
	id: number;
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
	thumbnailUrl: string;
	year: number;
	genres: string[];
	styles: string[];
	tracks: {
		title: string;
		duration: string;
		artists: {
			name: string;
			url: string;
		}[];
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
