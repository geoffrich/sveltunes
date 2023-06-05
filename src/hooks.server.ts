import type { RequestEvent } from '@sveltejs/kit';

function getUserId(event: RequestEvent) {
	const session = event.cookies.get('session');
	if (session) {
		try {
			const parsed = JSON.parse(session);
			// in real life, you'd want to check that this is a valid session
			// otherwise this would allow impersonation
			return parsed.userId;
		} catch (e) {
			console.log('invalid session', e);
		}
	}
	return null;
}

export async function handle({ event, resolve }) {
	event.locals = {
		userId: getUserId(event)
	};
	return resolve(event);
}
