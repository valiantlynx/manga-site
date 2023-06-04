import { pb } from '@/utils/pb';

async function getSearch(page: Number, word: String) {
    try {
        if (word.length === 0) {
            return [];
        }
        // fetch a paginated records list
        const resultList = await pb
            .collection('manga')
            .getList(1, 15, {
                filter: `title~"${word}"`,
            })

            console.log("resultList: ", resultList)

        const pocketbaseResults: MangaPocketbase = resultList;
        return pocketbaseResults.items;
    } catch (error) {
        console.log(error);
    }
}

export default getSearch