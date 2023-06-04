"use client"
import Carousel from './components/Carousel'
import getPopular from '@/utils/getPopular';
import { useState, useEffect } from 'react';
import Grid from './components/Grid';

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
    </main>
  )
}


