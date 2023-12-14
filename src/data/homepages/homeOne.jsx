function homeOne() {
    const data = {
        title: "home-01",
        content: [
            {
                section: "hero-section",
                headings: [
                    {
                        id: 1,
                        content:
                            "Oppdag lokale bedrifter, arrangementer og kultur på Altlokalt.",
                    },
                ],
                texts: [
                    {
                        id: 1,
                        content:
                            "Oppdag det spennende i ditt lokalområde på Altlokalt.com. Finn info om lokale bedrifter, arrangementer og kultur. Bli med nå!",
                    },
                ],
                buttons: [
                    {
                        id: 1,
                        content: "Bli med",
                        path: "/login",
                    },
                    {
                        id: 2,
                        color: "primary-alta",
                        content: "Opprett din profil",
                        path: "/sign-up",
                    },
                ],
                images: [
                    {
                        src: "/images/slider/slider-1.jpg",
                        alt: "Homepage Image in altlokalt.com, picture of local business in Bergen, Norway",
                    },
                ],
            },
            {
                section: "service-section",
                section_title: {
                    title: "Altlokalt Service",
                },
                items: [
                    {
                        id: 1,
                        title: "Oppdag ditt lokalområde",
                        path: "/opplevelser",
                        subtitle: "Trinn 1",
                        description:
                            "Bli med i fellesskapet av lokale innbyggere og oppdag alt det spennende som skjer i ditt lokalområde. Finn informasjon om lokale bedrifter, arrangementer, kultur og mye mer.",
                        images: [
                            {
                                src: "/images/icons/shape-7.png",
                                alt: "bilde av informasjonsskilt, oppdag ditt lokalområde på Altlokalt.com, finn lokale bedrifter, leverandør, arrangementer og kultur",
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: "Støtt lokale bedrifter",
                        path: "/lokale-bedrifter",
                        subtitle: "Trinn 2",
                        description:
                            "Finn lokale bedrifter og tjenester som tilbyr det du trenger. Støtt opp om lokale bedrifter og bidra til å skape et levende og blomstrende lokalsamfunn.",
                        images: [
                            {
                                src: "/images/icons/shape-1.png",
                                alt: "bilde av lokale bedrifter, støtt lokale bedrifter på Altlokalt.com, finn lokale bedrifter, leverandør, arrangementer og kultur",
                            },
                        ],
                    },
                    {
                        id: 3,
                        title: "Finn lokale arrangementer",
                        path: "/arrangementer",
                        subtitle: "Trinn 3",
                        description:
                            "Hold deg oppdatert på lokale arrangementer, konserter, festivaler og mye mer. Finn noe å gjøre i ditt nærområde og bli kjent med andre i lokalsamfunnet.",
                        images: [
                            {
                                src: "/images/icons/shape-5.png",
                                alt: "bilde av finn lokale arrangementer, finn lokale bedrifter, leverandør, arrangementer og kultur på Altlokalt.com",
                            },
                        ],
                    },
                    {
                        id: 4,
                        title: "Din lokale guide",
                        path: "/collection",
                        subtitle: "Trinn 4",
                        description:
                            "Bruk vår lokale guide til å utforske ditt lokalområde og oppleve alt det har å tilby. Enten du er på jakt etter kultur, natur eller spennende aktiviteter, så finner du det her.",
                        images: [
                            {
                                src: "/images/icons/shape-6.png",
                                alt: "bilde av din lokale guide, finn lokale bedrifter, leverandør, arrangementer og kultur på Altlokalt.com",
                            },
                        ],
                    },
                ],
            },

            {
                section: "live-explore-section",
                section_title: {
                    title: "Live Bidding",
                },
            },
            {
                section: "newest-section",
                section_title: {
                    title: "Nyeste Bedrifter",
                },
            },
            {
                section: "top-sller-section",
                section_title: {
                    title: "Mest Aktive Brukere på",
                },
            },
            {
                section: "explore-product-section",
                section_title: {
                    title: "Populære Selskaper",
                },
            },
            {
                section: "collection-section",
                section_title: {
                    title: "Bedrifter i nærområdet",
                },
            },
        ],
    };
    return data;
}

export default homeOne;
