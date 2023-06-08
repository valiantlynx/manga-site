import { MetadataRoute } from 'next';
import { pb } from '@/utils/pb';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://animevariant.org';

  // you can also fetch all records at once via getFullList
  const records: any = await pb.collection('manga').getFullList({
    sort: '-created',
  });
  const mangaUrls = records?.map((manga: any) => {
    // & is not a valid character in XML, so replace with &amp;
    const mangaUrl = `${baseUrl}/manga/${manga.id}/${manga.titleId}?mangaParkId=${manga.mangaParkId}&amp;mangaTitle=${manga.titleId}&amp;mangaId=${manga.id}&amp;img=${manga.img}`;
    return {
      url: mangaUrl,
      lastModified: new Date(manga.updated),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/welcome`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
    },
    ...mangaUrls,
  ];
}