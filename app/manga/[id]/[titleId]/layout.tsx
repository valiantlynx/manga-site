import '@/app/globals.css'
import getDetails from '@/utils/getDetails';

export async function generateMetadata({ params }: { params: { id: string, titleId: string } }) {
    const { id, titleId } = params
    const data: any = await getDetails(id, titleId); // deduped
    console.log(" - generating metadata for " + titleId, id + " - ", data)

    if (!data) {
      return {
        title: 'Post Not Found',
      }
    }
  
    return {
      data,
    }
  }



export default function ChapterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}