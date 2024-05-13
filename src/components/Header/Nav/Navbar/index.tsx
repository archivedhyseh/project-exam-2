import { NavLink } from 'react-router-dom'
import { navRoutes } from '../../data'

export default function Navbar() {
  return (
    <nav className="hidden md:flex">
      {navRoutes.map((route, index) => (
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
      ))}
    </nav>
  )
}
