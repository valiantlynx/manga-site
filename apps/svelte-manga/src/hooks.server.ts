import PocketBase from 'pocketbase';
import { site } from '@valiantlynx/general-config';
import { serializeNonPOJOs } from '$lib/utils/api';
import * as amp from '@sveltejs/amp';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	let buffer = '';
	event.locals.pb = new PocketBase(site.site.pocketbase);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	
	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) {
		await event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html, done }) => {
			buffer += html;
			if (done) return amp.transform(buffer);
		}
	});
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};
