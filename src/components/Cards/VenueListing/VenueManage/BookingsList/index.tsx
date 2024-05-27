import { Fragment } from 'react/jsx-runtime'
import { Bookings } from '../../../../../api/types'
import BookingsCard from '../BookingsCard'

type BookingsListProps = {
  bookings: Bookings[]
}

export default function BookingsList({ bookings }: BookingsListProps) {
  if (bookings) {
    bookings.sort((a, b) => {
      const dateA = Date.parse(a.dateFrom)
      const dateB = Date.parse(b.dateFrom)

      return dateA - dateB
    })
  }

  return (
    <div className="flex flex-col gap-8">
      {bookings.length > 1 ? (
        bookings.map(({ id, dateFrom, dateTo, guests, customer }) => (
          <Fragment key={id}>
            <BookingsCard
              dateFrom={dateFrom}
              dateTo={dateTo}
              guests={guests}
              customer={customer}
            />

            <hr className="border-black-alt" />
          </Fragment>
        ))
      ) : (
        <span className="text-text">
          Your venue does not have any bookings yet.
        </span>
      )}
    </div>
  )
}
