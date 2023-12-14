import { pb, url } from "../lib/pb";

async function products() {
    const companies = [];
    const ansatte = [];
    await pb
        .collection("companies")
        .getList(1, 10, {
            sort: "-updated",
            expand: "forretningsadresse, kontakt",
        })
        .then((data) => {
            data.items.forEach((item) => {
                companies.push(item);
            });
        })
        .catch(() => {
            // do nothing for now
        });

    await pb
        .collection("ansatte")
        .getList(1, 4, {
            expand: "jobb",
        })
        .then((data) => {
            data.items.forEach((item) => {
                ansatte.push(item);
            });
        })
        .catch(() => {
            // do nothing for now
        });

    const data = [];

    let authors = [];

    companies.forEach(async (company) => {
        // get ansatte with the company id
        const ansatteCompany = ansatte
            .map((ansatt) => {
                if (ansatt.expand?.jobb) {
                    if (ansatt.expand?.jobb.id === company.id) {
                        return ansatt;
                    }
                }
                return null; // add a default return value
            })
            .filter((ansatt) => ansatt !== null);

        authors = ansatteCompany.map((ansatt) => ({
            name: ansatt.navn,
            slug: "/author", // use a string literal instead of a variable
            image: {
                src: ansatt.bilde
                    ? `${url}/api/files/ansatte/${ansatt.id}/${ansatt.bilde}`
                    : "/images/client/client-2.png",
                alt: ansatt.navn
                    ? `an image of ${ansatt.navn}, a user on altlokalt.com `
                    : "default image of a user in altlokalt.com",
            },
        }));

        const dataTemplate = {
            id: company.id,
            title: company.navn,
            slug: `${company.organisasjonsnummer}`,
            published_at: company.updated,
            latestBid: company.expand?.forretningsadresse
                ? company.expand?.forretningsadresse.kommune
                : "N/A",
            price: {
                amount: "",
                currency: company.hjemmeside
                    ? company.hjemmeside
                    : "Ingen hjemmeside",
            },
            likeCount: company.likeCount,
            categories: ["music", "video"],
            images: [
                {
                    src: company.image[0]
                        ? `${url}/api/files/companies/${company.id}/${company.image[0]}`
                        : "/images/portfolio/lg/portfolio-01.jpg",
                    alt: company.navn
                        ? `en bilde av ${company.navn}, en bedrift hos altlokalt.com `
                        : "standard bilde av et bedrift hos altlokalt.com",
                },
                {
                    src: company.image[1]
                        ? `${url}/api/files/companies/${company.id}/${company.image[1]}`
                        : "/images/portfolio/lg/portfolio-02.jpg",
                    alt: company.navn
                        ? `en bilde av ${company.navn}, en bedrift hos altlokalt.com `
                        : "standard bilde av et bedrift hos altlokalt.com",
                },
                {
                    src: company.image[2]
                        ? `${url}/api/files/companies/${company.id}/${company.image[2]}`
                        : "/images/portfolio/lg/portfolio-03.jpg",
                    alt: company.navn
                        ? `en bilde av ${company.navn}, en bedrift hos altlokalt.com `
                        : "standard bilde av et bedrift hos altlokalt.com",
                },
            ],
            auction_date: company.created,
            authors,
            bitCount: company.antallAnsatte,
            owner: {
                name: "Brodband",
                slug: "/author",
                image: {
                    src: "/images/client/client-1.png",
                },
            },
            collection: {
                name: "Art Decco",
                slug: "/collection",
                image: {
                    src: "/images/client/client-2.png",
                },
                total_sale: "2500,000",
            },
            bids: [
                {
                    id: 1,
                    user: {
                        name: "Allen Waltker",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-3.png",
                        },
                    },
                    amount: "0.234wETH",
                    bidAt: "1 hours ago",
                },
                {
                    id: 2,
                    user: {
                        name: "Joe Biden",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-4.png",
                        },
                    },
                    amount: "0.09wETH",
                    bidAt: "1.30 hours ago",
                },
                {
                    id: 3,
                    user: {
                        name: "Sonial Mridha",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-5.png",
                        },
                    },
                    amount: "0.07wETH",
                    bidAt: "1.35 hours ago",
                },
                {
                    id: 4,
                    user: {
                        name: "Tribute Dhusra",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-6.png",
                        },
                    },
                    amount: "0.07wETH",
                    bidAt: "1.55 hours ago",
                },
                {
                    id: 5,
                    user: {
                        name: "Sonia Sobnom",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-7.png",
                        },
                    },
                    amount: "0.07wETH",
                    bidAt: "2 hours ago",
                },
                {
                    id: 6,
                    user: {
                        name: "Sadia Rummon",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-8.png",
                        },
                    },
                    amount: "0.07wETH",
                    bidAt: "2.5 hours ago",
                },
            ],
            properties: [
                {
                    id: 1,
                    type: "HYPE TYPE",
                    value: "CALM AF (STILL)",
                },
                {
                    id: 2,
                    type: "BASTARDNESS",
                    value: "C00LIO BASTARD",
                },
                {
                    id: 3,
                    type: "TYPE",
                    value: "APE",
                },
                {
                    id: 4,
                    type: "ASTARDNESS",
                    value: "BASTARD",
                },
                {
                    id: 5,
                    type: "BAD HABIT(S)",
                    value: "PIPE",
                },
                {
                    id: 6,
                    type: "BID",
                    value: "BPEYti",
                },
                {
                    id: 7,
                    type: "ASTRAGENAKAR",
                    value: "BASTARD",
                },
                {
                    id: 8,
                    type: "CITY",
                    value: "TOKYO",
                },
            ],
            tags: [
                {
                    id: 1,
                    type: "ZARY",
                    value: "APP",
                },
                {
                    id: 2,
                    type: "SOMALIAN",
                    value: "TRIBUTE",
                },
                {
                    id: 3,
                    type: "TUNA",
                    value: "PIPE",
                },
                {
                    id: 4,
                    type: "BID",
                    value: "BPEYti",
                },
                {
                    id: 5,
                    type: "ASTRAGENAKAR",
                    value: "BASTARD",
                },
                {
                    id: 8,
                    type: "CITY",
                    value: "TOKYO",
                },
            ],
            history: [
                {
                    id: 1,
                    user: {
                        name: "Allen Waltker",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-3.png",
                        },
                    },
                    amount: "0.234wETH",
                    bidAt: "1 hours ago",
                },
                {
                    id: 2,
                    user: {
                        name: "Joe Biden",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-4.png",
                        },
                    },
                    amount: "0.09wETH",
                    bidAt: "1.30 hours ago",
                },
                {
                    id: 3,
                    user: {
                        name: "Sonial Mridha",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-5.png",
                        },
                    },
                    amount: "0.07wETH",
                    bidAt: "1.35 hours ago",
                },
                {
                    id: 4,
                    user: {
                        name: "Tribute Dhusra",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-6.png",
                        },
                    },
                    amount: "0.07wETH",
                    bidAt: "1.55 hours ago",
                },
                {
                    id: 5,
                    user: {
                        name: "Sonia Sobnom",
                        slug: "/author",
                        image: {
                            src: "/images/client/client-7.png",
                        },
                    },
                    amount: "0.07wETH",
                    bidAt: "2 hours ago",
                },
            ],
            highest_bid: {
                amount: company.expand?.kontakt
                    ? company.expand?.kontakt.email
                    : "valiantlynxz@gmail.com",
                bidder: {
                    name: company.expand?.kontakt
                        ? company.expand?.kontakt.navn
                        : "altlokalt",
                    slug: "/author",
                    image: {
                        src: company.expand?.kontakt
                            ? `${url}/api/files/ansatte/${company.expand?.kontakt.id}/${company.expand?.kontakt.bilde}`
                            : "/images/client/client-1.png",
                        alt: company.expand?.kontakt
                            ? `kontact person for ${company.navn} - ${company.expand?.kontakt.navn}, en bedrift hos altlokalt.com `
                            : "default image of a user in altlokalt.com",
                    },
                },
            },
            sale_type: "fixed-price",
            level: "Intermediate",
            language: company.maalform,
            rating: 5,
        };

        data.push(dataTemplate);
    });

    return data;
}

export default products;
