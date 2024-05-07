import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FocusOn } from 'react-focus-on'

type ModalProps = {
  children: ReactNode
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export default function Modal({
  children,
  isModalOpen,
  setIsModalOpen,
}: ModalProps) {
  return (
    isModalOpen &&
    createPortal(
      <FocusOn onEscapeKey={() => setIsModalOpen(false)}>
        <div className="fixed left-0 top-0 z-[1000] h-full w-full bg-black/30 sm:px-10 sm:pt-10 lg:p-10">
          <div className="relative mx-auto flex h-full max-w-screen-lg flex-col bg-background shadow sm:rounded-t-md lg:rounded-lg">
            <div className="flex justify-end px-4 py-5 lg:py-4">
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
            <div className="w-full overflow-hidden overflow-y-auto px-4 py-5 lg:py-4">
              {children}
            </div>
          </div>
        </div>
      </FocusOn>,
      document.getElementById('portal')!
    )
  )
}
