import { NavLink } from 'react-router-dom'
import { routes } from '../data'

export default function Navbar() {
  return (
    <nav className="hidden md:flex">
      {routes.map((route, index) => {
        return (
          <NavLink
            key={index}
            to={route.href}
            className={({ isActive }) =>
              isActive
                ? 'inline-flex rounded-full px-5 py-3 font-bold text-text'
                : 'inline-flex rounded-full px-5 py-3 text-text hover:bg-background-alt'
            }
          >
            {route.title}
          </NavLink>
        )
      })}
    </nav>
  )
}
