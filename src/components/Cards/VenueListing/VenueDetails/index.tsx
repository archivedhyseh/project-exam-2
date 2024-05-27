import { Profile } from '../../../../api/types'
import VenueDescription from './VenueDescription'
import VenueHeading from './VenueHeading'
import VenueHost from './VenueHost'
import VenueOffers from './VenueOffers'

type VenueDetailsProps = {
  name: string
  description: string
  maxGuests: number
  rating: number
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
  owner: Profile
}

export default function VenueDetails({
  name,
  description,
  maxGuests,
  rating,
  meta,
  location,
  owner,
}: VenueDetailsProps) {
  return (
    <>
      <VenueHeading
        name={name}
        maxGuests={maxGuests}
        rating={rating}
        location={location}
      />

      <hr className="border-black-alt" />

      <VenueDescription description={description} />

      <hr className="border-black-alt" />

      <VenueOffers meta={meta} />

      <hr className="border-black-alt" />

      <VenueHost owner={owner} />

      <hr className="border-black-alt" />
    </>
  )
}
