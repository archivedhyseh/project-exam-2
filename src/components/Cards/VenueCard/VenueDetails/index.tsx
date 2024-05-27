import {
  formatCity,
  formatCountry,
  formatName,
} from '../../../../utility/format'

type VenueDetailsProps = {
  name: string
  price: number
  location: {
    address: string
    city: string
    zip: string
    country: string
    continent: string
    lat: number
    lng: number
  }
}

export default function VenueDetails({
  name,
  price,
  location,
}: VenueDetailsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="line-clamp-1 text-text-muted">
          {formatCity(location.city)}, {formatCountry(location.country)}
        </span>

        <h2 className="line-clamp-1 text-ellipsis break-all font-bold text-text">
          {formatName(name)}
        </h2>
      </div>

      <div>
        <span className="font-semibold text-text">€{price} </span>
        <span className="font-normal text-text">night</span>
      </div>
    </div>
  )
}
