import { renderMainSitemap } from '$lib/utils/api';

export const trailingSlash = 'never';

export const GET = async ({ url, fetch }) => {

    const res = fetch(`/api/create-sitemap`, { method: 'GET' })
	.then(res => res.json())
	.then(res => {
		console.log('fgfgfg------>',res);
	})
	.catch(err => {
		console.log('err------>',err);
	});

	return new Response(renderMainSitemap(url.origin), {
		headers: {
			'content-type': 'application/xml; charset=utf-8'
		}
	});
};
new Response();