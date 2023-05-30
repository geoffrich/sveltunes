import api from '$lib/api';

export function load({ params }) {
	return {
		detail: api.getMasterRelease(params.id)
	};
}
