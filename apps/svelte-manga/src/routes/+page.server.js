import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils/api';

export const load = async ({ locals }) => {
	const mangas = await Popular(locals, 1);
	return {
		mangas
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	popular: async (event) => {
		const data = await event.request.formData();
		const page = data.get('page');

		console.log('page', page);
		try {
			const mangas = await Popular(event.locals, page);  
			return {
				mangas
			};
		} catch (err) {
			console.log('err', err);
			throw error(err.status, err.message);
		}
		
	}
};

// function to get the data from the url
const Popular = async (locals, pageNo) => {
	const resultList = serializeNonPOJOs(
		await locals.pb.collection('reading_progress').getList(1, 20, {
			filter: 'user = "77760erf1db6qql"',
			expand: ['manga', 'currentChapter'],
			perPage: 20,
			sort: '-rating',
			page: pageNo
		})
	);

	const mangas = resultList.items.map((manga) => manga.expand?.manga);
	return mangas;
};
