import { Link } from 'react-router-dom'
import {
  formatCity,
  formatCountry,
  formatName,
} from '../../../../utility/format'

type VenueDetailsProps = {
  id: string
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
  id,
  name,
  price,
  location,
}: VenueDetailsProps) {
  return (
    <div className="relative">
      <Link
        to={`/venue/${id}`}
        className="absolute left-0 top-0 h-full w-full rounded-lg"
      />

      <span className="line-clamp-1 text-text-muted">
        {formatCity(location.city)}, {formatCountry(location.country)}
      </span>

      <h2 className="line-clamp-1 text-ellipsis break-all font-bold text-text">
        {formatName(name)}
      </h2>

      <div>
        <span className="font-semibold text-text">€{price} </span>
        <span className="font-normal text-text">night</span>
      </div>
    </div>
  )
}
