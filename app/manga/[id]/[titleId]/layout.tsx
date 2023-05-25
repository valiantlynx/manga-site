import '@/app/globals.css'
import getDetails from '@/utils/getDetails';

export async function generateMetadata({ params }: { params: { id: string, titleId: string } }) {
    const { id, titleId } = params
    const data: any = await getDetails(id, titleId); // deduped
  
    if (!data) {
      return {
        title: 'Post Not Found',
      }
    }
  
    return {
      title: titleId,
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