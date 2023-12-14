import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { pb } from "../../../lib/pb";

const SearchForm = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery("");
        router.push(`product/${results[0].organisasjonsnummer}/`);
    };

    const search = async (event) => {
        setQuery(event.target.value);
        setActive(true);
        if (query) {
            const resultList = await pb
                .collection("companies")
                .getList(1, 5, {
                    filter: `navn ~ "${query}"`,
                })
                .catch(() => {
                    // Handle error
                });
            setResults(resultList?.items.map((item) => item));
        }
    };
    return (
        <form
            className="search-form-wrapper"
            action="submit"
            onSubmit={(e) => handleSubmit(e)}
        >
            <input
                type="search"
                placeholder="Søk Her..."
                aria-label="Search"
                onChange={(event) => {
                    search(event);
                }}
            />
            <div className="search-icon">
                <button
                    aria-label="search form button. search for inserted company"
                    type="button"
                    value={query}
                    onClick={() => handleSubmit()}
                >
                    <i className="feather-search" />
                </button>
            </div>
            {active && results && (
                <ul className="">
                    {results.map((result) => (
                        <li className="">
                            <Link
                                key={result.id}
                                href={`/product/${result.organisasjonsnummer}`}
                                onClick={() => {
                                    setActive(false);
                                    setQuery("");
                                }}
                                className=""
                            >
                                {result.navn}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchForm;
