import { Link } from 'react-router-dom'

type HeroProps = {
  setIsHostOpen: (value: boolean) => void
}

export default function Hero({ setIsHostOpen }: HeroProps) {
  const accessToken = localStorage.getItem('accessToken')

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div className="grid gap-2 sm:gap-0">
          <h1 className="text-balance text-center text-3xl font-semibold text-text">
            Discover the perfect place to stay with Holidaze
          </h1>

          <p className="text-balance text-center text-xl text-text-muted">
            Book venues with ease or turn your space into a hosting opportunity
          </p>
        </div>

        <div className="flex flex-col justify-center gap-2 gap-x-4 sm:flex-row">
          <Link
            to="/venues"
            className="inline-flex w-full justify-center gap-2 rounded-full bg-brand px-3 py-2 font-bold text-white hover:bg-brand-hover sm:max-w-40 lg:px-5 lg:py-3"
          >
            Browse venues
          </Link>

          {accessToken ? (
            <button
              onClick={() => setIsHostOpen(true)}
              className="inline-flex w-full justify-center gap-1 rounded-full bg-black px-3 py-2 font-bold text-white hover:bg-black-hover sm:max-w-40 lg:px-5 lg:py-3"
            >
              Start hosting
            </button>
          ) : (
            <Link
              to="/signup"
              className="inline-flex w-full justify-center gap-1 rounded-full bg-black px-3 py-2 font-bold text-white hover:bg-black-hover sm:max-w-40 lg:px-5 lg:py-3"
            >
              Start hosting
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
