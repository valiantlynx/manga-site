"use client"
import React from 'react'
import getSearch from '@/utils/getSearch'
import { useState } from 'react'
import Loading from '../loading'
import Link from 'next/link'
import Image from 'next/image'
import debounce from 'lodash/debounce';

function Search() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    // Debounced function that will be called after a delay
    const debouncedSearch = debounce(async (value: string) => {
        const results: any = await getSearch(1, value);
        setResults(results);
        setLoading(false);
    }, 300); // Delay of 300 milliseconds

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearch(value);
        setLoading(true);

        debouncedSearch(value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // send the user to the search page or the manga page if there is only one result or something
    }

    return (
        <form className="form-control" onSubmit={handleSubmit}>
            <div className="input-group dropdown text-base-content">

                <input
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered"
                    value={search}
                    onChange={handleChange}
                />
                <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>


                {/** dropdown when search is not empty */}
                {search.length > 0 && (

                    <div className="overflow-y-auto dropdown-content bg-base-100 rounded-box w-64 mt-14 menu-container h-96">
                        <table className="table w-full">
                            <tbody>
                                {loading && (
                                    <Loading />
                                )}
                                {results?.length >= 0 && (
                                    results.map((result: any) => (
                                        <tr key={result.id}>
                                            <Link
                                                href={{
                                                    pathname: `/manga/${result.id}/${result.titleId}`,
                                                    query: {
                                                        img: result.img,
                                                        mangaId: result.id,
                                                        mangaTitle: result.titleId,
                                                        mangaParkId: result.mangaParkId,
                                                    },
                                                }}
                                            >
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <Image
                                                                    src={result.img}
                                                                    alt={result.title}
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div >
                                                            {/* {result.title.substring(0, 20) + '...' // Limit to 20 characters and add ellipsis
                                                            } */}
                                                            {result.title}
                                                            <span className="badge badge-ghost badge-sm50">{result.id.substring(0, 10) + '...' // Limit to 20 characters and add ellipsis
                                                            }</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </Link>
                                        </tr>

                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </form>
    )
}

export default Search