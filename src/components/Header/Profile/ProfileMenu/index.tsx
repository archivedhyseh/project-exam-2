import { Link, useNavigate } from 'react-router-dom'
import { profileAuthRoutes, profileRoutes } from '../../data'

type ProfileMenuProps = {
  setIsDropdownOpen: (value: boolean) => void
  setIsHostOpen: (value: boolean) => void
}

export default function ProfileMenu({
  setIsDropdownOpen,
  setIsHostOpen,
}: ProfileMenuProps) {
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('accessToken')

  const handleLogout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('accessToken')

    setIsDropdownOpen(false)

    navigate('/', { replace: true })
  }

  return (
    <div className="absolute right-0 mt-2 flex min-w-60 flex-col whitespace-nowrap rounded-lg bg-background py-2 shadow">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          {!accessToken &&
            profileRoutes.map((route, index) => (
              <Link
                key={index}
                to={route.href}
                onClick={() => setIsDropdownOpen(false)}
                className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
              >
                {route.title}
              </Link>
            ))}

          {accessToken && (
            <>
              {profileAuthRoutes.map((route, index) => (
                <Link
                  key={index}
                  to={route.href}
                  onClick={() => setIsDropdownOpen(false)}
                  className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
                >
                  {route.title}
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  setIsHostOpen(true)
                }}
                className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
              >
                Host venue
              </button>
            </>
          )}
        </div>

        {accessToken && (
          <>
            <hr className="border-black-alt" />

            <div className="flex flex-col">
              <button
                className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
                onClick={() => handleLogout()}
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
