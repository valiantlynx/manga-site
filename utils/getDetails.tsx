
import { pb } from '@/utils/pocketbase/pb';

async function getDetails(id: string, titleId: string) {
    console.log("id1: ", id);
    console.log("titleId1: ", titleId);
    try {
        const record = await pb
            .collection('chapters')
            .getFirstListItem(`mangaParkId="${id}"`, {
                expand: 'mangaId',
            });

        console.log("record: ", record);

       
    } catch (error) {
        console.log(error);
    }
}

export default getDetails