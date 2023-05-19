import axios from 'axios';
import { URL } from './URLS';

async function getEpisode(id: string, titleId: string, chapterid: string) {
    try {
        console.log("id: ", id, "titleId: ", titleId, "chapterid: ", chapterid);
        console.log("URL: ", `${URL.MANGA}${id}/${titleId}/${chapterid}`);
        const response: any = await axios
            .get(`${URL.MANGA}${id}/${titleId}/${chapterid}`, {
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
            .catch((error) => {
                console.log(error);
            });

        const chapterData: Chapter = response.data;
        return chapterData.images;
    } catch (error) {
        console.log(error);
    }
}

export default getEpisode