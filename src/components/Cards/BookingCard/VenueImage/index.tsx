type VenueImageProps = {
  media: { url: string; alt: string }[]
  name: string
}

export default function VenueImage({ media, name }: VenueImageProps) {
  return (
    <>
      {media.length > 0 ? (
        <div className="h-full w-full sm:max-h-40 sm:max-w-40">
          <img
            src={media[0].url}
            alt={media[0].alt || `Image of ${name}`}
            className="aspect-video h-full w-full overflow-hidden rounded-lg object-cover sm:aspect-square"
          />
        </div>
      ) : (
        <div className="flex aspect-video h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background-alt sm:aspect-square sm:max-h-40 sm:max-w-40">
          <span className="text-text">No image available</span>
        </div>
      )}
    </>
  )
}
