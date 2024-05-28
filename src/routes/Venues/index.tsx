import { useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  endOfDay,
  isAfter,
  isBefore,
  isEqual,
  parseISO,
  startOfDay,
} from 'date-fns'
import { Errors, Meta, Venue } from '../../api/types'
import VenueCard from '../../components/Cards/VenueCard'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import Search from './Search'
import Filters from './Filters'

type fetchVenuesProps = {
  pageParam: number
  query: string | null
}

const fetchVenues = async ({ pageParam, query }: fetchVenuesProps) => {
  let url =
    'https://v2.api.noroff.dev/holidaze/venues' +
    `?page=${pageParam}` +
    '&limit=60' +
    '&sort=created' +
    '&_bookings=true'

  if (query) {
    url =
      'https://v2.api.noroff.dev/holidaze/venues/search' +
      `?q=${query}` +
      `&page=${pageParam}` +
      '&limit=60' +
      '&sort=created' +
      '&_bookings=true'
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data: { data: Venue[]; meta: Meta; errors: Errors[] } = await res.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  return data
}

export default function Venues() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')

  const { data, error, isError, isSuccess, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['venues', query],
      queryFn: ({ pageParam }) => fetchVenues({ pageParam, query }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.meta.nextPage,
      select: (data) => {
        const venues = []
        for (const page of data.pages) {
          for (const venue of page.data) {
            venues.push(venue)
          }
        }
        return venues
      },
    })

  let venues: Venue[] = []

  if (isSuccess) {
    venues = data.filter((venue) => {
      const guestsParam = searchParams.get('guests')
      const checkinParam = searchParams.get('checkin')
      const checkoutParam = searchParams.get('checkout')

      if (venue.bookings) {
        if (checkinParam && checkoutParam) {
          const checkin = startOfDay(parseISO(checkinParam))
          const checkout = endOfDay(parseISO(checkoutParam))

          for (const booking of venue.bookings) {
            const bookedCheckin = startOfDay(parseISO(booking.dateFrom))
            const bookedCheckout = endOfDay(parseISO(booking.dateTo))

            if (
              (isBefore(bookedCheckin, checkout) ||
                isEqual(bookedCheckin, checkout)) &&
              (isAfter(bookedCheckout, checkin) ||
                isEqual(bookedCheckout, checkin))
            ) {
              return false
            }
          }
        }
      }

      if (guestsParam) {
        const totalGuests = parseFloat(guestsParam)

        if (totalGuests > venue.maxGuests) return false
      }

      return true
    })
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      <div className="flex flex-col gap-y-8">
        <div className="mx-auto flex w-full max-w-screen-md gap-4">
          <Search />
          <Filters />
        </div>

        <hr className="border-black-alt" />

        {isError && <span className="text-text">{error.message}</span>}

        {isSuccess && venues.length > 0 && (
          <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {venues.map(({ id, name, media, price, location }) => (
              <VenueCard
                key={id}
                id={id}
                name={name}
                media={media}
                price={price}
                location={location}
              />
            ))}
          </div>
        )}

        {isSuccess && query && venues.length < 1 && (
          <div>
            <span className="font-semibold text-text">No venues found</span>

            <p className="text-text-muted">
              Please try a different search or remove some filters.
            </p>
          </div>
        )}

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
