export const load = async (event) => {
	const { id, chapterid } = event.params;
	const url = `/manga/${id}/${chapterid}`;

	const response = await event.fetch(
		event.url.origin + `/api/manga/${id}/${chapterid}?url=${url}`
	);
	const manga = await response.json();

	return {
		manga
	};
};