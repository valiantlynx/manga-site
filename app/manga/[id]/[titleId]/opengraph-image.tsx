import { pb } from '@/utils/pb';
import { ImageResponse } from "next/server";
import Image from 'next/image';

export const size = {
    width: 300,
    height: 500,
};

export const contentType = "image/png";

interface Props {
    params: {
        id: string;
    };
}

export default async function og({ params }: Props) {
    const record = await pb.collection('manga').getOne(`${params.id}`, {
        expand: 'relField1,relField2.subRelField',
    });
    const date: any = record?.updated
    
    return new ImageResponse(
        (
            <div tw="relative flex items-center justify-center">
                <Image src={record?.img} alt={record?.title} />
                <div tw="absolute flex bg-black opacity-10 inset-0 " />
                <div tw="absolute flex items-center top-2 w-full ">
                    <p tw="text-white text-xl flex font-bold m-5">{record?.title}</p>
                    <p tw="text-indigo-200 text-xl flex font-bold m-4">{record?.author[0]}</p>
                    <p tw="text-purple-200 text-xs flex font-bold my-7">{date}</p>
                </div>
            </div>
        ),
        size
    );
}