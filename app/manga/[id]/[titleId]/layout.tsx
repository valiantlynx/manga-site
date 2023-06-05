import '@/app/globals.css'

export function generateMetadata({ params }: { params: { id: string, titleId: string } }) {
    const { id, titleId } = params

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