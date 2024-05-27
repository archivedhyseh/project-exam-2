import { Venue } from '../../../api/types'
import VenueBooking from './VenueBooking'
import VenueDetails from './VenueDetails'
import VenueImage from './VenueImage'
import VenueManage from './VenueManage'

type VenueListingProps = {
  venue: Venue
}

export default function VenueListing({ venue }: VenueListingProps) {
  const username = localStorage.getItem('name')

  return (
    <>
      <div className="grid gap-4 gap-y-8 lg:grid-cols-3">
        <div className="grid lg:col-span-2">
          <div className="flex flex-col gap-8">
            <VenueImage media={venue.media} name={venue.name} />
            <VenueDetails
              name={venue.name}
              description={venue.description}
              maxGuests={venue.maxGuests}
              rating={venue.rating}
              meta={venue.meta}
              location={venue.location}
              owner={venue.owner!}
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          {venue.owner && venue.owner.name === username ? (
            <VenueManage venue={venue} />
          ) : (
            <VenueBooking
              bookings={venue.bookings}
              price={venue.price}
              maxGuests={venue.maxGuests}
            />
          )}
        </div>
      </div>
    </>
  )
}
