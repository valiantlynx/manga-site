import { pb } from "../lib/pb";

async function product(slug) {
    // or fetch only the first record that matches the specified filter
    const record = await pb
        .collection("companies")
        .getFirstListItem(`organisasjonsnummer=${slug}`)
        .catch(() => {
            // do nothing for now
        });
    return record;
}

export default product;
