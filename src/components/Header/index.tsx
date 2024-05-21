import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FocusOn } from 'react-focus-on'
import Navbar from './Nav/Navbar'
import NavButton from './Nav/NavButton'
import NavMenu from './Nav/NavMenu'
import ProfileButton from './Profile/ProfileButton'
import ProfileMenu from './Profile/ProfileMenu'
import Modal from '../Modal'
import HostForm from '../Forms/HostForm'
import HostFooter from '../Forms/HostForm/HostFooter'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isHostOpen, setIsHostOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.matchMedia('(max-width: 959px)').matches
  )

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const size = window.matchMedia('(max-width: 959px)')

    size.addEventListener('change', (e) => setIsMobile(e.matches))

    return () => {
      size.removeEventListener('change', (e) => setIsMobile(e.matches))
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Element)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isNavOpen) {
      setIsNavOpen(false)
    }
  }, [isMobile])

  return (
    <header className="sticky left-0 top-0 z-[800] bg-background lg:static">
      <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
        <div className="flex justify-between gap-4">
          <a
            href="/"
            aria-label="Holidaze"
            className="inline-flex rounded-md lg:rounded-lg"
          >
            <div className="flex items-center gap-1 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 lg:h-8 lg:w-8"
              >
                <path
                  fill="#5E5EF3"
                  d="M0 12a4 4 0 1 1 8 0v8a4 4 0 0 1-8 0v-8Zm16-8a4 4 0 0 1 8 0v16a4 4 0 0 1-8 0V4Zm-8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                />
                <path
                  fill="#5E5EF3"
                  fillRule="evenodd"
                  d="M4 0a4 4 0 1 0 0 8h3.407A.593.593 0 0 0 8 7.407V4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-bold text-brand lg:text-xl">Holidaze</span>
            </div>
          </a>

          {isMobile && <NavButton setIsOpen={setIsNavOpen} />}
          {!isMobile && <Navbar />}
          {!isMobile && (
            <div className="relative" ref={dropdownRef}>
              <ProfileButton
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
              />
              {isDropdownOpen && (
                <ProfileMenu
                  setIsDropdownOpen={setIsDropdownOpen}
                  setIsHostOpen={setIsHostOpen}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {isNavOpen &&
        createPortal(
          <FocusOn onEscapeKey={() => setIsNavOpen(false)}>
            <NavMenu
              setIsNavOpen={setIsNavOpen}
              setIsHostOpen={setIsHostOpen}
            />
          </FocusOn>,
          document.getElementById('portal')!
        )}

      <Modal
        isModalOpen={isHostOpen}
        setIsModalOpen={setIsHostOpen}
        modalFooter={<HostFooter setIsHostOpen={setIsHostOpen} />}
      >
        <HostForm setIsHostOpen={setIsHostOpen} />
      </Modal>
    </header>
  )
}
