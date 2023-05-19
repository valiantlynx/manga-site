"use client"
import Carousel from './components/Carousel'
import getPopular from '@/utils/getPopular';
import { useState, useEffect } from 'react';
import PopularAnime from './components/PopularAnime';

export default async function Home() {
  const [animeList, setAnimeList] = useState<PopularMangaProps[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function getAnimeList() {
      const animeList: any = await getPopular(page);
      setAnimeList(animeList);
    }
    getAnimeList();
  }, [page]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-base-200">
    <PopularAnime />
    </main>
  )
}


