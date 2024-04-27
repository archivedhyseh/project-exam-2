import { useEffect, useRef, useState } from 'react'
import Navbar from './Nav/Navbar'
import NavButton from './Nav/NavButton'
import NavMenu from './Nav/NavMenu'
import ProfileButton from './Profile/ProfileButton'
import ProfileMenu from './Profile/ProfileMenu'

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.matchMedia('(max-width: 959px)').matches
  )

  const dropdownMenuRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const size = window.matchMedia('(max-width: 959px)')
    size.addEventListener('change', (e) => setIsMobile(e.matches))

    return () => {
      size.removeEventListener('change', (e) => setIsMobile(e.matches))
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isDropdownOpen &&
        !dropdownMenuRef.current?.contains(e.target as Element)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="bg-background">
      <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
        <div className="flex justify-between gap-5">
          <a href="/" aria-label="Holidaze" className="inline-flex">
            <span className="flex items-center gap-1 py-2">
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
            </span>
          </a>
          {isMobile && <NavButton setIsOpen={setIsOpen} />}

          {!isMobile && <Navbar />}
          {!isMobile && (
            <div className="relative" ref={dropdownMenuRef}>
              <ProfileButton
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
              />
              {isDropdownOpen && <ProfileMenu />}
            </div>
          )}
        </div>
      </div>
      {isOpen && <NavMenu setIsOpen={setIsOpen} />}
    </header>
  )
}
