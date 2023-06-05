import { pb } from '@/utils/pb';

async function getDetails(id: string, titleId: string) {
    try {
        const record = await pb
            .collection('chapters')
            .getFirstListItem(`mangaId="${id}"`, {
                expand: 'mangaId',
            });
        // you can also fetch all records at once via getFullList
        const records = await pb.collection('chapters').getFullList({
            filter: `mangaId="${id}"`,
        });

        return {record, records};
    } catch (error) {
        console.log(error);
    }
}

export default getDetails