import type { RequestHandler } from './$types';
import { site } from '@valiantlynx/general-config';
import { icon } from '@valiantlynx/general-config';
export const prerender = true;
export const trailingSlash = 'never';
export const GET: RequestHandler = () =>
	new Response(
		JSON.stringify(
			{
				name: site.site.title,
				short_name: site.site.title,
				lang: site.site.lang,
				description: site.site.description,
				id: site.site.protocol + site.site.domain + '/',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				orientation: 'portrait',
				background_color: site.site.themeColor,
				theme_color: site.site.themeColor,
				icons: [
					...Object.values(icon.any)
						.filter((icon) => icon.sizes !== '180x180')
						.map((icon) => ({ ...icon, purpose: 'any' })),
					...Object.values(icon.maskable).map((icon) => ({ ...icon, purpose: 'maskable' }))
				]
			},
			null,
			2
		),
		{
			headers: {
				'Content-Type': 'application/manifest+json; charset=utf-8'
			}
		}
	);
