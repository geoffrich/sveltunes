import api from '$lib/api';
import { error, json } from '@sveltejs/kit';
import type { UndoRequest } from './action';

export async function POST({ locals, request }) {
	if (!locals.userId) throw error(401, 'Unauthorized');
	const { id }: UndoRequest = await request.json();
	api.favoriteAlbum(id, locals.userId);
	return json({ success: true });
}
