import { NavLink } from 'react-router-dom'
import TertiaryButton from '../../../Buttons/TertiaryButton'
import { routes } from '../data'
import PrimaryButton from '../../../Buttons/PrimaryButton'

type NavMenuProps = {
  setIsOpen: (value: boolean) => void
}

export default function NavMenu({ setIsOpen }: NavMenuProps) {
  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-full w-full justify-end bg-black/30 p-4">
      <nav className="flex h-full w-full max-w-80 flex-col gap-2 rounded-lg bg-background px-4 py-5 shadow">
        <div className="flex justify-between">
          <div className="flex items-center gap-1 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6"
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
            <span className="font-bold text-brand">Holidaze</span>
          </div>

          <TertiaryButton size="default" onClick={() => setIsOpen(false)}>
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
            <span>Close</span>
          </TertiaryButton>
        </div>

        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col">
            {routes.map((route, index) => {
              return (
                <NavLink
                  key={index}
                  to={route.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'inline-flex rounded-md py-2 font-bold text-text lg:rounded-full'
                      : 'inline-flex rounded-md py-2 text-text hover:text-text-muted lg:rounded-full'
                  }
                >
                  {route.title}
                </NavLink>
              )
            })}
          </div>

          <PrimaryButton size="full">Sign in</PrimaryButton>
        </div>
      </nav>
    </div>
  )
}
