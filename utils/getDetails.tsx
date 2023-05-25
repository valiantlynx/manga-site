import { pb } from '@/utils/pb';

async function getDetails(id: string, titleId: string) {
    try {
        const record = await pb
        .collection('chapters')
        .getFirstListItem(`mangaId="${id}"`, {
            expand: 'mangaId',
        });
        console.log("record: ", record);

        const mangaDetail: any = record;
        return mangaDetail.items;
    } catch (error) {
        console.log(error);
    }
}

export default getDetails