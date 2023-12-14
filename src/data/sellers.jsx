import { pb, url } from "../lib/pb";

async function sellers() {
    const users = [];
    const data = [];

    await pb
        .collection("users")
        .getList(1, 10, {
            filter: "created >= '2023-04-01 00:00:00'",
        })
        .then((res) => {
            res.items.forEach((item) => {
                users.push(item);
            });
        })
        .catch(() => {
            // do nothing for now
        });

    users.forEach((user) => {
        data.push({
            id: user.id,
            name: user.name,
            slug: "/author",
            image: {
                src: user.avatar
                    ? `${url}/api/files/users/${user.id}/${user.avatar}`
                    : "/images/client/client-12.png",
                alt: user.name
                    ? `profile picture of ${user.name} on altlokalt.com`
                    : `profile picture of a user on altlokalt.com`,
            },
            total_sale: 2500000,
            top_since: "1 day",
            isVarified: user.verified,
        });
    });

    return data;
}

export default sellers;
