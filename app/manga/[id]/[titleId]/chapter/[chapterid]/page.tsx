"use client"
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/app/components/BreadCrumbs';
import getEpisode from '@/utils/getEpisode';
import Image from 'next/image';
import populateEpisode from '@/utils/populateEpisode';
import { useSearchParams } from 'next/navigation';
import getDetails from '@/utils/getDetails';
import Link from 'next/link';

async function page({ params }: { params: { id: string, titleId: string, chapterid: string } }) {
  const { id, titleId, chapterid } = params
  const [chapterList, setChapterList] = useState<any>(null);
  const searchParams = useSearchParams();


  const mangaParkId: any = searchParams.get('mangaParkId');
  const chapterName: any = searchParams.get('chapterName');
  const chapterNumber: any = searchParams.get('chapterNumber');

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
      const results = await getDetails(id, titleId);

      let chaptersGroupedByLanguage: any = {};
      results?.records.forEach((record) => {
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
  }, [id, titleId, chapterid]);

  const chapterListchapters: any = []

  const chapters = Object.keys(chapterList || {}).map((language) => {
    return (
      <div key={language} className="my-4">
        <h2 className="text-lg font-bold text-blue-600 mb-2">{language}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {chapterList[language].map((chapter: any) => {
            chapterListchapters.push(chapter)
          })}
        </div>
      </div>
    );
  });

  // console.log('data chapterlist:', mangaParkId, titleId, chapterName, chapterNumber, chapterList,);
  let chapterListName: any;

  const test = chapterListchapters?.map((chapter: any) => {
    //console.log('chapter:', chapter.chapterId, "chapter.chapterNumber:", chapter.chapterNumber,);
    if (chapter.chapterId === chapterName) {
      chapterListName = chapter.chapterId;
    }
  })

  // console.log('chapterListName:', chapterListName);
  

  return (
    <div>
      <main className="flex-grow bg-gray-900">
        <Breadcrumbs items={breadcrumbs} />
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">Chapters:</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {chapterListchapters?.map((chapter: any) => {
              return (
                <li key={chapter.id} value={chapter.chapterNumber}>
                  <Link href={{
                    pathname: `/manga/${id}/${titleId}/chapter/${chapter.id}`,
                    query: { mangaParkId, chapterName: chapter.chapterId, chapterNumber: chapter.chapterNumber },
                  }}
                    className="join-item btn btn-outline"
                  >{chapter.chapterNumber}</Link>
                </li>
              )
            })
            }
          </ul>
        </div>

        {/* <div className="join grid grid-cols-2">
          <Link
            href={{
              pathname: `/manga/${id}/${titleId}/chapter/${chapterListName}`,
              query: { mangaParkId, chapterName, chapterNumber: chapterNumber - 1 },
            }}
            className="join-item btn btn-outline"
          >Previous page {chapterNumber - 1}</Link>
          <Link
            href={{
              pathname: `/manga/${id}/${titleId}/chapter/${chapterListName}`,
              query: { mangaParkId, chapterName, chapterNumber: chapterNumber + 1 },
            }}
            className="join-item btn btn-outline"
          >Next page {chapterNumber + 1}</Link>
        </div> */}

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

        {/* <div className="join grid grid-cols-2">
          <Link
            href={{
              pathname: `/manga/${id}/${titleId}/chapter/${chapterListName}`,
              query: { mangaParkId, chapterName, chapterNumber: chapterNumber - 1 },
            }}
            className="join-item btn btn-outline"
          >Previous page {chapterNumber - 1}</Link>
          <Link
            href={{
              pathname: `/manga/${id}/${titleId}/chapter/${chapterListName}`,
              query: { mangaParkId, chapterName, chapterNumber: chapterNumber + 1 },
            }}
            className="join-item btn btn-outline"
          >Next page {chapterNumber + 1}</Link>
        </div> */}
         <div className="dropdown">
          <label tabIndex={0} className="btn m-1">Chapters:</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {chapterListchapters?.map((chapter: any) => {
              return (
                <li key={chapter.id} value={chapter.chapterNumber}>
                  <Link href={{
                    pathname: `/manga/${id}/${titleId}/chapter/${chapter.id}`,
                    query: { mangaParkId, chapterName: chapter.chapterId, chapterNumber: chapter.chapterNumber },
                  }}
                    className="join-item btn btn-outline"
                  >{chapter.chapterNumber}</Link>
                </li>
              )
            })
            }
          </ul>
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
