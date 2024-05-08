import { useState } from 'react'
import { createPortal } from 'react-dom'
import { FocusOn } from 'react-focus-on'

type VenueModalProps = {
  media: { url: string; alt: string }[]
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export default function VenueModal({
  media,
  isModalOpen,
  setIsModalOpen,
}: VenueModalProps) {
  const [imageIndex, setImageIndex] = useState<number>(0)

  return (
    isModalOpen &&
    createPortal(
      <FocusOn onEscapeKey={() => setIsModalOpen(false)}>
        <div className="fixed left-0 top-0 z-[1000] flex h-full w-full justify-center bg-black">
          <div className="relative flex h-full w-full max-w-[1920px] flex-col">
            <div className="flex items-center justify-end px-4 py-5 lg:py-4">
              <button
                className="inline-flex justify-center gap-2 rounded-full bg-background-body p-2 text-text hover:bg-background-alt lg:p-3"
                onClick={() => setIsModalOpen(false)}
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="relative flex items-center gap-4 overflow-hidden py-5 sm:px-4 lg:gap-4 lg:py-4">
              <div className="absolute left-2 sm:left-4 md:static">
                <button
                  className="inline-flex justify-center gap-2 rounded-full bg-background-body p-2 text-text shadow hover:bg-background-alt disabled:text-text-muted/50 lg:p-3"
                  onClick={() => setImageIndex(imageIndex - 1)}
                  disabled={imageIndex >= 1 ? false : true}
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

              <div className="h-full w-full">
                <img
                  src={media[imageIndex].url}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="absolute right-2 sm:right-4 md:static">
                <button
                  className="inline-flex justify-center gap-2 rounded-full bg-background-body p-2 text-text shadow hover:bg-background-alt disabled:text-text-muted/50 lg:p-3"
                  onClick={() => setImageIndex(imageIndex + 1)}
                  disabled={imageIndex < media.length - 1 ? false : true}
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
            </div>

            <div className="relative flex items-center justify-center gap-2 px-4 py-5 lg:py-4">
              <div>
                <span className="text-white">
                  {imageIndex + 1} / {media.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </FocusOn>,
      document.getElementById('portal')!
    )
  )
}
