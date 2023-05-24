import { pb } from '@/utils/pocketbase/pb';

async function getHomeData(page: number) {
    try {
        // fetch a paginated records list
        const resultList = await pb
            .collection('manga')
            .getList(page, 15, {
                sort: '-created',
            })

        console.log("resultList: ", resultList);

        const pocketbaseResults: MangaPocketbase = resultList;
        return pocketbaseResults.items;

    } catch (error) {
        console.error("error: ", error);
    }
}

export default getHomeData;