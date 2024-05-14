import { Bookings, Profile } from '../../../api/types'
import VenueBooking from './VenueBooking'
import VenueDetails from './VenueDetails'
import VenueImage from './VenueImage'

type VenueListingProps = {
  name: string
  description: string
  media: { url: string; alt: string }[]
  price: number
  maxGuests: number
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean }
  location: {
    address: string
    city: string
    zip: string
    country: string
    continent: string
    lat: number
    lng: number
  }
  owner?: Profile
  bookings?: Bookings[]
}

export default function VenueListing({
  name,
  description,
  media,
  price,
  maxGuests,
  meta,
  location,
  owner,
  bookings,
}: VenueListingProps) {
  return (
    <>
      <div className="grid gap-4 gap-y-8 lg:grid-cols-3">
        <div className="grid gap-8 lg:col-span-2">
          <VenueImage media={media} name={name} />
          <VenueDetails
            name={name}
            description={description}
            meta={meta}
            location={location}
            owner={owner}
          />
        </div>

        <div className="lg:col-span-1">
          <VenueBooking
            bookings={bookings}
            price={price}
            maxGuests={maxGuests}
          />
        </div>
      </div>
    </>
  )
}
