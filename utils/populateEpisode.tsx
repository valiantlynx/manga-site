import axios from 'axios';
import { URL } from './URLS';

async function populateEpisode(id: string, titleId: string, chapterid: string) {
    try {
        const response: any = await axios
            .get(`${URL.MANGA}${id}/${titleId}/${chapterid}`, {
                headers: { 'Access-Control-Allow-Origin': '*' },
            })
            .catch((error) => {
                console.log(error);
            });

        const chapterData: Chapter = response.data;
        return chapterData;
    } catch (error) {
        console.log(error);
    }
}

export default populateEpisode