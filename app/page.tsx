"use client"
import Carousel from './components/Carousel'
import getPopular from '@/utils/getPopular';
import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import populatePopular from '@/utils/populatePopular';

export default async function Home() {
  const [mangaList, setMangaList] = useState<MangaItem[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getMangaList() {
      const mangaList: any = await getPopular(page);
      setMangaList(mangaList?.items);
    }
    getMangaList();
  }, [page]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-base-200">
      <Carousel items={mangaList} />
      <Grid mangaListArray={mangaList} page={page} setPage={setPage} />
      <div className="flex flex-col items-center justify-center h-full w-full md:w-4/5 lg:w-4/5 xl:w-3/5 mx-auto  ">
          <button onClick={() => {
            populatePopular(page);
          }}
            className="btn hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload to Pocketbase
          </button>
        </div>
    </main>
  )
}


