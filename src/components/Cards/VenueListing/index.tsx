import { Profile } from '../../../api/types'
import VenueBooking from './VenueBooking'
import VenueDetails from './VenueDetails'
import VenueImage from './VenueImage'

type VenueListingProps = {
  name: string
  description: string
  media: { url: string; alt: string }[]
  price: number
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean }
  owner?: Profile
}

export default function VenueListing({
  name,
  description,
  media,
  price,
  meta,
  owner,
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
            owner={owner}
          />
        </div>

        <div className="lg:col-span-1">
          <VenueBooking price={price} />
        </div>
      </div>
    </>
  )
}
