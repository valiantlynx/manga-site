import Image from 'next/image'
import Link from 'next/link'

function Carousel({ items }: CarouselProps) {
  // Add this check
  if (!items) {
    return null;
  }

  const carouselItems = items.map((child: any, index: number) => {
    return (
      <Link
        key={index}
        className="carousel-item text-base-content"
        aria-label={child.title}
        href={{
          pathname: `/manga/${child.id}/${child.titleId}`,
          query: { 
              img: child.img,
              mangaId: child.id,
              mangaTitle: child.titleId,
              mangaParkId: child.mangaParkId,
           },
      }}
      >
        <Image src={child.img} alt={child.title} width={200} height={200} />
      </Link>
    )
  })

  return (
    <div className="carousel carousel-center rounded-box">
      {carouselItems}
    </div>
  )
}

export default Carousel
