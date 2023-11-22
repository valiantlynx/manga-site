import { render } from '$lib/utils/api';
import { writeFile } from 'fs/promises';

export const GET = async (event) => {
	for (let i = 1; i <= 44; i++) {
		const data = await render(i, event.url.origin);
		await writeFile(`/static/sitemap-${i}.xml`, data, { encoding: 'utf-8', flag: 'w' });
	}
		const data = {
			sitemap: 'sitemap generation started',
		};

		return new Response (JSON.stringify(data), {
			headers: {
				'content-type': 'text/plain',
			},
		});
};
