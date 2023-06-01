import api from '$lib/api';

export async function load({ params }) {
	const detail = await api.getMasterRelease(params.id);
	return {
		detail,
		title: detail.title
	};
}
