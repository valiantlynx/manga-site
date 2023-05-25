import { pb } from '@/utils/pb';

async function getEpisode(id: string, titleId: string, chapterid: string) {
    try {
        // you can also fetch all records at once via getFullList
        const records = await pb.collection('images').getFullList({
            filter: `titleId="${titleId}" && chapterId="${chapterid}"`,
            sort: '-created',
        });

        const chapterImages = records;
        return chapterImages;
    } catch (error) {
        console.log(error);
    }
}

export default getEpisode