import { useInfiniteQuery } from '@tanstack/react-query'
import { Errors, Meta, Venue } from '../../api/types'
import VenueCard from '../../components/Cards/VenueCard'
import SecondaryButton from '../../components/Buttons/SecondaryButton'

const fetchVenues = async ({ pageParam }: { pageParam: number }) => {
  const res = await fetch(
    `https://v2.api.noroff.dev/holidaze/venues?limit=60&sort=created&page=${pageParam}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const data: { data: Venue[]; meta: Meta; errors: Errors[] } = await res.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  return data
}

export default function Venues() {
  const { data, error, isError, isSuccess, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['venues'],
      queryFn: fetchVenues,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
    })

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      {isError && <span>{error.message}</span>}
      <div className="flex flex-col gap-y-8">
        <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {isSuccess &&
            data.pages.map((page) => {
              return page.data.map(({ id, name, media, price, location }) => {
                return (
                  <VenueCard
                    key={id}
                    id={id}
                    name={name}
                    media={media}
                    price={price}
                    location={location}
                  />
                )
              })
            })}
        </div>

        {hasNextPage && (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex">
              <span className="text-balance text-center text-xl font-semibold text-text">
                Continue exploring venues
              </span>
            </div>

            <div>
              <SecondaryButton size="default" onClick={() => fetchNextPage()}>
                Show more
              </SecondaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
