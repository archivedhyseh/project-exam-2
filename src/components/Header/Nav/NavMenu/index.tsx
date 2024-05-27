import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authRoutes, navRoutes } from '../../data'
import IconButton from '../../../Buttons/IconButton'
import SecondaryButton from '../../../Buttons/SecondaryButton'

type NavMenuProps = {
  setIsNavOpen: (value: boolean) => void
  setIsHostOpen: (value: boolean) => void
  setIsProfileOpen: (value: boolean) => void
}

export default function NavMenu({
  setIsNavOpen,
  setIsHostOpen,
  setIsProfileOpen,
}: NavMenuProps) {
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('accessToken')

  const handleLogout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('accessToken')

    setIsNavOpen(false)

    navigate('/', { replace: true })
  }

  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-full w-full justify-end bg-black/30">
      <nav className="flex h-full w-full flex-col gap-2 bg-background px-4 py-5 shadow sm:max-w-[376px] sm:rounded-l-md">
        <div className="flex justify-end">
          <IconButton onClick={() => setIsNavOpen(false)}>
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
          </IconButton>
        </div>

        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col">
            {navRoutes.map((route, index) => (
              <NavLink
                key={index}
                to={route.href}
                onClick={() => setIsNavOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'inline-flex rounded-md py-2 font-bold text-text lg:rounded-full'
                    : 'inline-flex rounded-md py-2 text-text hover:text-text-muted lg:rounded-full'
                }
              >
                {route.title}
              </NavLink>
            ))}

            {accessToken && (
              <>
                {authRoutes.map((route, index) => (
                  <NavLink
                    key={index}
                    to={route.href}
                    onClick={() => setIsNavOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? 'inline-flex rounded-md py-2 font-bold text-text lg:rounded-full'
                        : 'inline-flex rounded-md py-2 text-text hover:text-text-muted lg:rounded-full'
                    }
                  >
                    {route.title}
                  </NavLink>
                ))}

                <button
                  onClick={() => {
                    setIsNavOpen(false)
                    setIsProfileOpen(true)
                  }}
                  className="inline-flex rounded-md py-2 text-text hover:text-text-muted lg:rounded-full"
                >
                  View profile
                </button>

                <button
                  onClick={() => {
                    setIsNavOpen(false)
                    setIsHostOpen(true)
                  }}
                  className="inline-flex rounded-md py-2 text-text hover:text-text-muted lg:rounded-full"
                >
                  Host venue
                </button>
              </>
            )}
          </div>

          {accessToken ? (
            <SecondaryButton size="full" onClick={() => handleLogout()}>
              Log out
            </SecondaryButton>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsNavOpen(false)}
              className="inline-flex w-full justify-center gap-2 rounded-full bg-brand px-3 py-2 font-bold text-white hover:bg-brand-hover lg:px-5 lg:py-3"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
