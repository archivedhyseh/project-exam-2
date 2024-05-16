import { useState } from 'react'
import VenueModal from './VenueModal'

type VenueImageProps = {
  media: { url: string; alt: string }[]
  name: string
}

export default function VenueImage({ media, name }: VenueImageProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div className="relative">
      <div className="h-full w-full">
        {media.length > 0 ? (
          <img
            src={media[0].url}
            alt={media[0].alt || `Image of ${name}`}
            className="aspect-video h-full w-full overflow-hidden rounded-lg object-cover"
          />
        ) : (
          <div className="flex aspect-video h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background-alt">
            <span>No image available</span>
          </div>
        )}
      </div>

      {media.length > 0 && (
        <>
          <button
            className="absolute left-0 top-0 h-full w-full rounded-lg hover:bg-black/30"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="sr-only">Open image modal</span>
          </button>

          {isModalOpen && (
            <VenueModal
              media={media}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </>
      )}
    </div>
  )
}
