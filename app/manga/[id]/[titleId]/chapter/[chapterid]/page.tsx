
"use client"
import Breadcrumbs from '@/app/components/BreadCrumbs';
import getEpisode from '@/utils/getEpisode';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { id: string, titleId: string, chapterid: string } }) {
  const { id, titleId, chapterid } = params
  console.log("id: ", id, "titleId: ", titleId, "chapterid: ", chapterid);

  const data: any = await getEpisode(id, titleId, chapterid);

  return {
    title: `${titleId} Episode ${chapterid}`,
  }
}


async function page({ params }: { params: { id: string, titleId: string, chapterid: string } }) {

  const { id, titleId, chapterid } = params

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: `${titleId}`, url: `/manga/${id}/${titleId}` },
    { label: `Chapter ${chapterid}`, url: `/manga/${id}/${titleId}/chapter/${chapterid}` }
  ];

  const data: any = await getEpisode(id, titleId, chapterid);
  return (
    <div>
      <main className="flex-grow bg-gray-900">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col items-center justify-center h-full w-4/5 mx-auto">
          {data.map((page: any) => (
              <Image
                key={page.pageNumber}
                src={page.imageUrl}
                alt={`${titleId} Episode ${chapterid} Page ${page.id}`}
                className="w-full"
              />
          ))}
        </div>
      </main>
    </div>
  );
}

export default page;
