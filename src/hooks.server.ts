import type { RequestEvent } from '@sveltejs/kit';

function getUserId(event: RequestEvent) {
	return 123;
}

export async function handle({ event, resolve }) {
	event.locals = {
		userId: getUserId(event)
	};
	return resolve(event);
}
