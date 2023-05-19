import '../globals.css'
import getDetails from '@/utils/getDetails';

export async function generateMetadata({ params }: { params: { id: string, titleId: string } }) {
    const { id, titleId } = params
    const { title }: any = await getDetails(id, titleId); // deduped
  
    if (!title) {
      return {
        title: 'Post Not Found',
      }
    }
  
    return {
      title,
    }
  }



export default function RecentLayout({
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