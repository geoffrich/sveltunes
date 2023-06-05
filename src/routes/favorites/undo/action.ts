import { invalidate, goto } from '$app/navigation';
import type { Album } from '$lib/types';
import { toastStore } from '@skeletonlabs/skeleton';

// experimental pattern co-locating the code calling a server endpoint
// with the actual server route itself

export function promptUndo(album: Album, redirectTo?: string) {
	const cb = () =>
		fetch('/favorites/undo', {
			method: 'POST',
			body: JSON.stringify({ id: album.id.toString() }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(() => invalidate('app:favorites'))
			.then(() => (redirectTo ? goto(redirectTo) : null));

	toastStore.trigger({
		message: `Removed ${album.title} from favorites.`,
		action: {
			label: 'Undo',
			response: cb
		}
	});
}