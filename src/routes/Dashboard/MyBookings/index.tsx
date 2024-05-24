import { Bookings } from '../../../api/types'
import UpcomingCard from '../../../components/Cards/UpcomingCard'

type MyBookingsProps = {
  bookings: Bookings[]
}

export default function MyBookings({ bookings }: MyBookingsProps) {
  bookings.sort((a, b) => {
    const dateA = Date.parse(a.dateFrom)
    const dateB = Date.parse(b.dateFrom)

    return dateA - dateB
  })

  return (
    <>
      {bookings.length > 0 ? (
        <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {bookings.map(({ id, dateFrom, dateTo, venue }) => (
            <UpcomingCard
              key={id}
              dateFrom={dateFrom}
              dateTo={dateTo}
              venue={venue}
            />
          ))}
        </div>
      ) : (
        <span className="text-text">
          You do not have any upcoming bookings.
        </span>
      )}
    </>
  )
}
