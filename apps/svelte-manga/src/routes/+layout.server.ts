import { serializeNonPOJOs } from '$lib/utils/api';

export const load = async (event) => {
	if (event.locals.user) {
		return {
			user: event.locals.user,
			sites: await Sites(event)
		};
	}

	const data = {
		user: undefined,
		sites: await Sites(event)
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

