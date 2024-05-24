type VenueImageProps = {
  media: { url: string; alt: string }[]
  name: string
}

export default function VenueImage({ media, name }: VenueImageProps) {
  return (
    <>
      {media.length > 0 ? (
        <div>
          <img
            src={media[0].url}
            alt={media[0].alt || `Image of ${name}`}
            className="aspect-square h-full w-full overflow-hidden rounded-lg object-cover"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background-alt">
          <span className="text-text">No image available</span>
        </div>
      )}
    </>
  )
}
