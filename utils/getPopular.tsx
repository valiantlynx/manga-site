import { pb } from '@/utils/pb';

async function getPopular(page: number) {
    try {
       // fetch a paginated records list
        const resultList = await pb
            .collection('manga')
            .getList(page, 15, {
                sort: '-created',
            })

        const pocketbaseResults: MangaPocketbase = resultList;
        return pocketbaseResults;
    } catch (error) {
        console.log(error);
    }
}

export default getPopular;