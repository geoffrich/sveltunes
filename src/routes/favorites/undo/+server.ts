import api from '$lib/api';
import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
	// TODO: better typesafety, ran into a bug where we were sending a number instead of a string and it made the db inconsistent
	const { id } = await request.json();
	api.favoriteAlbum(id, locals.userId);
	return json({ success: true });
}
