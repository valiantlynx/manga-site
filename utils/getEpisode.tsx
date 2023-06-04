import { pb } from '@/utils/pb';

async function getEpisode(id: string, titleId: string, chapterid: string) {
    try {
        // you can also fetch all records at once via getFullList   
        const records = await pb.collection('images').getFullList({
            filter: `chapterId="${chapterid}"`,
            sort: '-pageNumber',
        });
        return records;
    } catch (error) {
        console.log(error);
    }
}

export default getEpisode