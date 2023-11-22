import { render, renderMainSitemap } from '$lib/utils/api';
import schedule from 'node-schedule';
import { writeFile } from 'fs/promises';

export const GET = (event) => {
		//run the job every minute. sitemap.xml is cached for 1 minute
		schedule.scheduleJob('0 * * * *', async function () {
			// render the main sitemap.xml and save it to the public folder
			const mainSitemap = await renderMainSitemap(event.url.origin);
			await writeFile(`./static/sitemap.xml`, mainSitemap, { encoding: 'utf-8', flag: 'w' });
			// render the sitemap.xml for pages 1-52 and save it to the public folder
			for (let i = 1; i <= 44; i++) {
				const data = await render(i, event.url.origin);
				await writeFile(`./static/sitemap-${i}.xml`, data, { encoding: 'utf-8', flag: 'w' });
			}
		});

		const data = {
			sitemap: 'sitemap generation started',
		};

		return new Response (JSON.stringify(data), {
			headers: {
				'content-type': 'text/plain',
			},
		});
};
