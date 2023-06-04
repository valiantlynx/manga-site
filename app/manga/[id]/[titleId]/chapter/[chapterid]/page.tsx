"use client"
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/app/components/BreadCrumbs';
import getEpisode from '@/utils/getEpisode';
import Image from 'next/image';
import populateEpisode from '@/utils/populateEpisode';
import { useSearchParams } from 'next/navigation';

async function page({ params }: { params: { id: string, titleId: string, chapterid: string } }) {
  const { id, titleId, chapterid } = params
  const searchParams = useSearchParams();

  const mangaParkId: any = searchParams.get('mangaParkId');
  const chapterName: any = searchParams.get('chapterName');

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: `${titleId}`, url: `/manga/${id}/${titleId}` },
    { label: `Chapter ${chapterid}`, url: `/manga/${id}/${titleId}/chapter/${chapterid}` }
  ];

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEpisode(id, titleId, chapterid);
      setData(result);
    };
    fetchData();
  }, [id, titleId, chapterid]);

  console.log('data:', mangaParkId, titleId, chapterName);

  return (
    <div>
      <main className="flex-grow bg-gray-900">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col items-center justify-center h-full w-full md:w-4/5 lg:w-4/5 xl:w-3/5 mx-auto  ">
          {data && data.map((page: any) => (
            <Image
              key={page.pageNumber}
              src={page.img}
              alt={`${titleId} Chapter ${chapterid} Page ${page.id}`}
              className='w-full'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 33vw"
              width={4 / 5}
              height={5 / 5}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center h-full w-full md:w-4/5 lg:w-4/5 xl:w-3/5 mx-auto  ">
          <button onClick={() => {
            populateEpisode(mangaParkId, titleId, chapterName);
          }}
            className="btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload to Pocketbase
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { id, titleId, chapterid } = context.params;
  const initialData = await getEpisode(id, titleId, chapterid);

  return {
    props: {
      initialData,
      params: { id, titleId, chapterid }
    }
  }
}

export default page;
