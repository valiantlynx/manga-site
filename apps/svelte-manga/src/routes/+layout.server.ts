import { serializeNonPOJOs } from '$lib/utils/api';


export const load = async (event) => {
	// remove the www. and .com or whatever from the url if it exists and use that as the site name
	const siteName = event.url.origin.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('.')[0];

	if (event.locals.user) {
		return {
			user: event.locals.user,
			sites: await Sites(event),
			siteName
		};
	}
	
	const data = {
		user: undefined,
		sites: await Sites(event),
		siteName
	};
	return data;
};

const Sites = async (event) => {
	// you can also fetch all records at once via getFullList
const records = serializeNonPOJOs(
	await event.locals.pb.collection('sites').getFullList()
	);
const adtxt = records.find((item: any) => item.site.includes(event.url.origin));
	
	return adtxt;
};

