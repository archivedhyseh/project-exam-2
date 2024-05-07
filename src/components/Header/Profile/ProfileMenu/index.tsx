import { Link } from 'react-router-dom'
import { routes } from '../data'

type ProfileMenuProps = {
  setIsOpen: (value: boolean) => void
}

export default function ProfileMenu({ setIsOpen }: ProfileMenuProps) {
  return (
    <div className="absolute right-0 mt-2 flex min-w-60 flex-col whitespace-nowrap rounded-lg bg-background py-2 shadow">
      {routes.map((route, index) => {
        return (
          <Link
            key={index}
            to={route.href}
            onClick={() => setIsOpen(false)}
            className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
          >
            {route.title}
          </Link>
        )
      })}
    </div>
  )
}
