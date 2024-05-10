import { Profile } from '../../../../api/types'
import {
  formatCity,
  formatCountry,
  formatName,
} from '../../../../utility/format'
import VenueHost from './VenueHost'
import VenueOffers from './VenueOffers'

type VenueDetailsProps = {
  name: string
  description: string
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
}

export default function VenueDetails({
  name,
  description,
  meta,
  location,
  owner,
}: VenueDetailsProps) {
  return (
    <>
      <div className="grid gap-4">
        <div>
          <span className="line-clamp-1 font-semibold text-text">
            {formatCity(location.city)}, {formatCountry(location.country)}
          </span>

          <h1 className="break-all text-3xl font-bold text-text">
            {formatName(name)}
          </h1>
        </div>

        <p className="grid gap-1">
          <span className="text-text-muted">Description</span>
          <span className="line-clamp-6 max-w-screen-md text-text">
            {description}
          </span>
        </p>
      </div>

      <hr className="border-black-alt" />

      <VenueOffers meta={meta} />

      <hr className="border-black-alt" />

      <VenueHost owner={owner} />

      <hr className="border-black-alt" />
    </>
  )
}
