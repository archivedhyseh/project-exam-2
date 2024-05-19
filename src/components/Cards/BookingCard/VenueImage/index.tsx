type VenueImageProps = {
  media: { url: string; alt: string }[]
  name: string
}

export default function VenueImage({ media, name }: VenueImageProps) {
  return (
    <div className="h-full w-full sm:max-h-40 sm:max-w-40">
      {media.length > 0 ? (
        <img
          src={media[0].url}
          alt={media[0].alt || `Image of ${name}`}
          className="aspect-video h-full w-full overflow-hidden rounded-lg object-cover sm:aspect-square"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background-alt">
          <span>No image available</span>
        </div>
      )}
    </div>
  )
}
