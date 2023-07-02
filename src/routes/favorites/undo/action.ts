import { invalidate, goto } from '$app/navigation';
import type { Album } from '$lib/types';
import { toastStore } from '@skeletonlabs/skeleton';

export interface UndoRequest {
	id: string;
}

// experimental pattern co-locating the code calling a server endpoint
// with the actual server route itself

export function promptUndo(
	album: Album,
	opts: { redirectTo?: string; afterUndo?: () => void } = {}
) {
	const request: UndoRequest = { id: album.id.toString() };
	const cb = () =>
		fetch('/favorites/undo', {
			method: 'POST',
			body: JSON.stringify(request),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(() => opts.afterUndo?.())
			.then(() => invalidate('app:favorites'))
			.then(() => (opts.redirectTo ? goto(opts.redirectTo) : null));

	toastStore.trigger({
		message: `Removed ${album.title} from favorites.`,
		action: {
			label: 'Undo',
			response: cb
		}
	});
}
