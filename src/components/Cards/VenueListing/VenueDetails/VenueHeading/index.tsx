import {
  formatCity,
  formatCountry,
  formatName,
} from '../../../../../utility/format'

type VenueHeadingProps = {
  name: string
  maxGuests: number
  rating: number
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

export default function VenueHeading({
  name,
  maxGuests,
  rating,
  location,
}: VenueHeadingProps) {
  return (
    <div className="grid max-w-screen-md gap-4">
      <div className="grid gap-1">
        <div className="flex items-center gap-1 text-text">
          <span>
            {formatCity(location.city)}, {formatCountry(location.country)}
          </span>
        </div>

        <h1 className="break-all text-3xl font-bold text-text">
          {formatName(name)}
        </h1>

        <ol className="inline-flex items-center gap-1 text-text">
          <li>{maxGuests} guests allowed</li>
          <li aria-hidden="true" className="cursor-default">
            •
          </li>
          <li>{rating} star venue</li>
        </ol>
      </div>
    </div>
  )
}
