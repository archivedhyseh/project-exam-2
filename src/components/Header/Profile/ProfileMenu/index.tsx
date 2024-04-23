import { Link } from 'react-router-dom'
import { routes } from '../data'

export default function ProfileMenu() {
  return (
    <div className="absolute right-0 mt-2 flex min-w-60 flex-col whitespace-nowrap rounded-lg bg-background py-2 shadow">
      {routes.map((route, index) => {
        return (
          <Link
            key={index}
            to={route.href}
            className="inline-flex w-full px-5 py-3 hover:bg-background-alt"
          >
            {route.title}
          </Link>
        )
      })}
    </div>
  )
}
