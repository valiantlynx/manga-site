import MangaDetails from "@/app/components/MangaDetails"

async function page({ params }: { params: { id: string, titleId: string } }) {
  const { id, titleId }: any = params
  return (
    <MangaDetails params={{
      id,
      titleId
    }} />
    
  )
}

export default page