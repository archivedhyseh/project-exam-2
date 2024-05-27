import { format } from 'date-fns'
import {
  formatCity,
  formatCountry,
  formatName,
} from '../../../../utility/format'

type VenueDetailsProps = {
  name: string
  dateFrom: string
  dateTo: string
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
  dateFrom,
  dateTo,
  location,
}: VenueDetailsProps) {
  const checkin = format(dateFrom, 'dd LLL yyyy')
  const checkout = format(dateTo, 'dd LLL yyyy')

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
        <span className="text-text">
          {checkin} - {checkout}
        </span>
      </div>
    </div>
  )
}
