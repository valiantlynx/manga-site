"use client"
import React from 'react'
import populateSearch from '@/utils/populateSearch'
import { useState } from 'react'
import Loading from '../loading'
import Link from 'next/link'
import Image from 'next/image'

function RequestSearch() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
        setLoading(true)

        // fix this later search is not working
        const results: any = await populateSearch(1, e.target.value)
        console.log("results search: ", results)
        setResults(results)
        
        setLoading(false)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
       // send the user to the search page or the manga page if there is only one result or something
    }

    return (
        <form className="form-control my-10" onSubmit={handleSubmit}>
            <div className="input-group dropdown ">

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
                                {results.length >= 0 && (
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
                                                            <span className="badge badge-ghost badge-sm50">{result.latestChapter.substring(0, 10) + '...' // Limit to 20 characters and add ellipsis
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

export default RequestSearch