"use client"
import { useState, useEffect } from 'react';
import getPopular from '@/utils/getPopular';
import Grid from './Grid';
import Breadcrumbs from './BreadCrumbs';
import { notFound } from "next/navigation"

export default function PopularManga() {
    const [mangaList, setMangaList] = useState<MangaItem[]>([]);
    const [page, setPage] = useState<number>(1);

    const breadcrumbs = [
        { label: 'Home', url: '/' },
        { label: `Popular Manga`, url: `/popular` },
    ];

    useEffect(() => {
        async function getMangaList() {
            const mangaList: any = await getPopular(page);
            console.log("mangaList: ", mangaList);
            setMangaList(mangaList);
        }
        getMangaList();
    }, [page]);


    if (!mangaList) {
        return (
            <div className="container mx-auto px-4">
                <Breadcrumbs items={breadcrumbs} />
                <h1 className="text-3xl font-bold mt-8 mb-4">Popular Manga - Page {page}</h1>
                <p>No manga found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl font-bold mt-8 mb-4">Popular Manga - Page {page}</h1>
            <Grid mangaListArray={mangaList} page={page} setPage={setPage} />
        </div>
    );
}
