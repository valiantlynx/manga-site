import { pb } from '@/utils/pb';
import { ImageResponse } from "next/server";

export const size = {
    width: 750,
    height: 2000,
};

export const contentType = "image/png";

interface Props {
    params: {
        chapterid: string;
    };
}

export default async function og({ params }: Props) {
    // or fetch only the first record that matches the specified filter
    const resultList: any = await pb.collection('images').getList(1, 10, {
        filter: `chapterId="${params.chapterid}"`,
        expand: 'chapterId,titleId',
    });

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const record = resultList.items[randomNumber && 3]

    console.log("record:", record?.updated)

    const date: any = record?.updated

    return new ImageResponse(
        (
            <div tw="relative flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={record?.img} alt={record?.titleId?.title} />
                <div tw="absolute flex bg-black opacity-10 inset-0 " />
                <div tw="absolute flex items-center top-2 w-full ">
                    <p tw="text-black text-xl flex font-bold m-5">{record?.expand?.titleId.title + "chapter " + record?.expand?.chapterId.chapterNumber}</p>
                    <p tw="text-indigo-200 text-xl flex font-bold m-4">{record?.chapterText}</p>
                    <p tw="text-purple-200 text-xs flex font-bold my-7">{date}</p>
                </div>
            </div>
        ),
        size
    );
}