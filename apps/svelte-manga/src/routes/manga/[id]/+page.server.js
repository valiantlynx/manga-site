export const load = async (event) => {
	console.log('event', event);
	const { id } = event.params;

	const url = `/manga/${id}`;

	const response = await fetch(event.url.origin + `/api/manga/${id}?url=${url}`);
	const manga = await response.json();

	return {
		manga
	};
};
