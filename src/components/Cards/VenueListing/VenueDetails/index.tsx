import { Profile } from '../../../../api/types'
import VenueHost from './VenueHost'
import VenueOffers from './VenueOffers'

type VenueDetailsProps = {
  name: string
  description: string
  meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean }
  owner?: Profile
}

export default function VenueDetails({
  name,
  description,
  meta,
  owner,
}: VenueDetailsProps) {
  return (
    <>
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold text-text">{name}</h1>
        <p className="grid gap-1">
          <span className="text-text-muted">Description</span>
          <span className="line-clamp-6 max-w-screen-md text-text">
            {description}
          </span>
        </p>
      </div>

      <hr className="border-black-alt" />

      <VenueOffers
        breakfast={meta.breakfast}
        parking={meta.parking}
        pets={meta.pets}
        wifi={meta.wifi}
      />

      <hr className="border-black-alt" />

      <VenueHost owner={owner} />
    </>
  )
}
