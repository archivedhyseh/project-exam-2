import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { errorRoutes } from './data'

export default function Error() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <main className="min-h-dvh">
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-5 lg:py-4">
            <div className="sm:p-10 lg:p-20">
              <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <h1 className="text-balance text-center text-3xl font-semibold text-text">
                  Something went wrong!
                </h1>

                <span className="text-center font-semibold text-text-muted">
                  {error.status} page not found
                </span>

                <p className="text-pretty text-text">
                  The page you are looking for cannot be found. If you believe
                  this is an error, feel free to reach out to our support team
                  for assistance. Thank you for your patience and understanding.
                </p>

                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-text">
                    Here are some links instead:
                  </span>

                  <ul>
                    {errorRoutes.map((route, index) => (
                      <li key={index}>
                        <Link
                          to={route.href}
                          className="inline-flex py-0.5 font-semibold text-brand hover:text-brand-hover"
                        >
                          {route.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      )
    }

    if (error.status === 500) {
      return (
        <main className="min-h-dvh">
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-5 lg:py-4">
            <div className="sm:p-10 lg:p-20">
              <div className="mx-auto flex max-w-3xl flex-col gap-8">
                <h1 className="text-balance text-center text-3xl font-semibold text-text">
                  Something went wrong!
                </h1>

                <span className="text-center font-semibold text-text-muted">
                  {error.status} internal server error
                </span>

                <p className="text-pretty text-text">
                  An error occurred and we are working to fix the problem. We
                  will be back up and running again as soon as possible. If you
                  need immediate support, please reach out to our support team
                  for assistance. Thank you for your patience and understanding.
                </p>
              </div>
            </div>
          </div>
        </main>
      )
    }
  }

  return (
    <main className="min-h-dvh">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-5 lg:py-4">
        <div className="sm:p-10 lg:p-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <h1 className="text-balance text-center text-3xl font-semibold text-text">
              Something went wrong!
            </h1>

            <span className="text-center font-semibold text-text-muted">
              Unknown error
            </span>

            <p className="text-pretty text-text">
              Please try refreshing the page or come back a bit later. If the
              problem persists, feel free to reach out to our support team for
              assistance. Thank you for your patience and understanding.
            </p>

            <div className="flex flex-col gap-2">
              <span className="font-semibold text-text">
                Here are some links instead:
              </span>

              <ul>
                {errorRoutes.map((route, index) => (
                  <li key={index}>
                    <Link
                      to={route.href}
                      className="inline-flex py-0.5 font-semibold text-brand hover:text-brand-hover"
                    >
                      {route.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
