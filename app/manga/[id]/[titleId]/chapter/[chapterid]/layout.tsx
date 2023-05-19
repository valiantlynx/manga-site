import '@/app/globals.css'

export async function generateMetadata({ params }: { params: { id: string, titleId: string, chapterid: string } }) {
    const { id, titleId, chapterid } = params
    return {
        title: `${titleId} Chapter ${chapterid}`,
        description: 'Read the latest manga online for free at animevariant.org, update fastest, most full, synthesized 24h free with high-quality images and be the first one to publish new chapters.',
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