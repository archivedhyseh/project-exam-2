import { useEffect, useRef, useState } from 'react'
import Modal from '../../../../Modal'

type VenueDescriptionProps = {
  description: string
}

export default function VenueDescription({
  description,
}: VenueDescriptionProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isReadMore, setIsReadMore] = useState<boolean>(false)

  const descriptionRef = useRef<null | HTMLParagraphElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      const scollHeight = descriptionRef.current.scrollHeight
      const clientHeight = descriptionRef.current.clientHeight

      if (scollHeight > clientHeight) {
        setIsReadMore(true)
      } else {
        setIsReadMore(false)
      }
    }
  }, [description])

  return (
    <div className="grid max-w-screen-md gap-4">
      <h2 className="text-xl font-semibold text-text">Description</h2>

      <div className="flex flex-col gap-4">
        <p ref={descriptionRef} className="line-clamp-3 text-text">
          {description.trim().length > 1 ? (
            <span>{description}</span>
          ) : (
            <span>No description available.</span>
          )}
        </p>

        {isReadMore && (
          <div>
            <button
              className="inline-flex justify-center gap-1 rounded-md font-semibold text-text hover:text-text-muted lg:rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Read more</span>
            </button>

            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
              <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold text-text">
                  <span>Description</span>
                </div>

                <p className="text-text">
                  <span>{description}</span>
                </p>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  )
}
