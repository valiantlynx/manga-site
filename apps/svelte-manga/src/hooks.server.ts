import PocketBase from 'pocketbase';
import { site } from '@valiantlynx/general-config';
import { serializeNonPOJOs, render, renderMainSitemap } from '$lib/utils/api';
import schedule from 'node-schedule';
import { writeFile } from 'fs/promises';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(site.site.pocketbase);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	//run the job every minute. sitemap.xml is cached for 1 minute
	schedule.scheduleJob('*/1 * * * *', async function () {
		// render the main sitemap.xml and save it to the public folder
		const mainSitemap = await renderMainSitemap(event.url.origin);
		await writeFile(`./static/sitemap.xml`, mainSitemap, { encoding: 'utf-8', flag: 'w' });

		// render the sitemap.xml for pages 1-52 and save it to the public folder
		for (let i = 1; i <= 44; i++) {
			const data = await render(i, event.url.origin);
			await writeFile(`./static/sitemap-${i}.xml`, data, { encoding: 'utf-8', flag: 'w' });
		}
	});

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) {
		await event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};
