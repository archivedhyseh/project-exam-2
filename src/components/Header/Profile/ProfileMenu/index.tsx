import { Link } from 'react-router-dom'
import { profileAuthRoutes, profileRoutes } from '../../data'

type ProfileMenuProps = {
  setIsOpen: (value: boolean) => void
}

export default function ProfileMenu({ setIsOpen }: ProfileMenuProps) {
  const accessToken = localStorage.getItem('accessToken')

  return (
    <div className="absolute right-0 mt-2 flex min-w-60 flex-col whitespace-nowrap rounded-lg bg-background py-2 shadow">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          {!accessToken &&
            profileRoutes.map((route, index) => (
              <Link
                key={index}
                to={route.href}
                onClick={() => setIsOpen(false)}
                className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
              >
                {route.title}
              </Link>
            ))}

          {accessToken &&
            profileAuthRoutes.map((route, index) => (
              <Link
                key={index}
                to={route.href}
                onClick={() => setIsOpen(false)}
                className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
              >
                {route.title}
              </Link>
            ))}
        </div>

        {accessToken && (
          <>
            <hr className="border-black-alt" />

            <div className="flex flex-col">
              <button className="inline-flex w-full px-5 py-3 hover:bg-background-alt">
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
