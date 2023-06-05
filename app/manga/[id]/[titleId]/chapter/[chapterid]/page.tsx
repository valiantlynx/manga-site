import ChapterDetails from "@/app/components/ChapterDetails"

async function page({ params }: { params: { id: string, titleId: string, chapterid: string } }) {
  const { id, titleId, chapterid }: any = params
  return (

    <ChapterDetails params={{
      id,
      titleId,
      chapterid
    }} />


  )
}

export default page