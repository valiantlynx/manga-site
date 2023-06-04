"use client"
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/app/components/BreadCrumbs';
import Chapter from '@/app/components/Chapter';
import getDetails from '@/utils/getDetails';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import populateDetails from '@/utils/populateDetails';

async function MangaDetails({ params }: { params: { id: string, titleId: string } }) {
  const { id, titleId }: any = params
  const [chapterList, setChapterList] = useState<any>(null);
  const [chapter, setChapter] = useState<any>(null);
  const searchParams = useSearchParams();

  const image: any = searchParams.get('img');
  const mangaId: any = searchParams.get('mangaId');
  const mangaTitle: any = searchParams.get('mangaTitle');
  const mangaParkId: any = searchParams.get('mangaParkId');
  const chapterName: any = searchParams.get('chapterName');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDetails(id, titleId);
      setChapter(result?.record);

      let chaptersGroupedByLanguage: any = {};
      result?.records.forEach((record) => {
        const chapterId = record.chapterId;
        const language = chapterId.split('-')[1];

        if (!chaptersGroupedByLanguage[language]) {
          chaptersGroupedByLanguage[language] = [];
        }

        chaptersGroupedByLanguage[language].push(record);
      });

      setChapterList(chaptersGroupedByLanguage);
    };
    fetchData();
  }, [id, titleId]);

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: `${titleId}`, url: `/manga/${id}/${titleId}` },
  ];
  
  const chapters = Object.keys(chapterList || {}).map((language) => {
    return (
      <div key={language} className="my-4">
        <h2 className="text-lg font-bold text-blue-600 mb-2">{language}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {chapterList[language].map((chapter: any) => {
            return (
              <Chapter
                key={chapter.id}
                mangaTitle={mangaTitle}
                chapterId={chapter.id}
                image={image}
                mangaId={mangaId}
                mangaParkId={mangaParkId}
                chapterName={chapter.chapterId}
              />
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="container mx-auto px-4">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <Image src={image} alt={titleId} width={200} height={300} className="w-full h-auto" />
        </div>
        <div className="md:w-2/3 mt-8 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-bold mb-4">{titleId}</h1>
          <div className="mb-4">
            <span className="font-bold">Type:</span> {titleId}
          </div>
          <div className="mb-4">
            <span className="font-bold">Released:</span> {titleId}
          </div>
          <div className="mb-4">
            <span className="font-bold">Genres:</span>
            {titleId}
          </div>
          <div className="mb-4">
            <span className="font-bold">Status:</span> {titleId}
          </div>
          <div className="mb-4">
            <span className="font-bold">Other Name:</span> {titleId}
          </div>
          <div className="mb-4">
            <span className="font-bold">Summary:</span> {titleId}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Chapters</h2>
        <div className="flex flex-col gap-4">
          {chapters}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full md:w-4/5 lg:w-4/5 xl:w-3/5 mx-auto  ">
        <button onClick={() => { populateDetails(mangaParkId, titleId) }}
          className="btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload to Pocketbase
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { id, titleId } = context.params;
  const result = await getDetails(id, titleId);

  return {
    props: {
      chapter: result?.record,
      chapterList: result?.records,
      params: { id, titleId },
    },
  };
};
export default MangaDetails
