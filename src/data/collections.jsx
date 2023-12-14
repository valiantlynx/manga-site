import { pb } from "../lib/pb";

async function collections() {
    const kommuner = [];
    const data = [];
    let totalItems = 0;

    await pb
        .collection("forretningsadresse")
        .getList(1, 4)
        .then((res) => {
            totalItems = res.totalItems;
            res.items.forEach((item) => {
                kommuner.push(item);
            });
        })
        .catch(() => {
            // do nothing for now
        });

    kommuner.forEach((kommune) => {
        data.push({
            id: kommune.id,
            title: kommune.kommune,
            slug: "/collection",
            total_item: totalItems,
            image: {
                src: "/images/collection/collection-lg-01.jpg",
            },
            thumbnails: [
                {
                    src: "/images/collection/collection-sm-01.jpg",
                },
                {
                    src: "/images/collection/collection-sm-02.jpg",
                },
                {
                    src: "/images/collection/collection-sm-03.jpg",
                },
            ],
            profile_image: {
                src: "/images/client/client-15.png",
            },
        });
    });
    return data;
}

export default collections;
