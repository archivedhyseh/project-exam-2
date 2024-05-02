import { useState } from 'react'

type VenueModalProps = {
  setIsOpen: (value: boolean) => void
  media: { url: string; alt: string }[]
}

export default function VenueModal({ setIsOpen, media }: VenueModalProps) {
  const [imageIndex, setImageIndex] = useState<number>(0)

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen overflow-hidden bg-black">
      <div className="flex h-full w-full flex-col gap-4 px-4 py-5 lg:py-4">
        <div className="flex justify-between gap-5">
          <span className="text-white">
            {imageIndex + 1} / {media.length}
          </span>

          <button onClick={() => setIsOpen(false)} className="text-white">
            Close
          </button>
        </div>

        <div className="relative h-full overflow-hidden">
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={media[imageIndex].url}
              className="h-full w-full object-contain"
            />
          </div>

          {imageIndex >= 1 && (
            <div className="absolute left-0 top-1/2 ml-4">
              <button
                onClick={() => setImageIndex(imageIndex - 1)}
                className="inline-flex aspect-square rounded-full border border-white p-2 text-white hover:border-white-hover lg:p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
                <span className="sr-only">Previous image</span>
              </button>
            </div>
          )}

          {imageIndex < media.length - 1 && (
            <div className="absolute right-0 top-1/2 mr-4">
              <button
                onClick={() => setImageIndex(imageIndex + 1)}
                className="inline-flex aspect-square rounded-full border border-white p-2 text-white hover:border-white-hover lg:p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
                <span className="sr-only">Next image</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
