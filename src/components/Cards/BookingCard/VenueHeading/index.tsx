import {
  formatCity,
  formatCountry,
  formatName,
} from '../../../../utility/format'

type VenueHeadingProps = {
  name: string
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

export default function VenueHeading({ name, location }: VenueHeadingProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <span className="text-text">
        {formatCity(location.city)}, {formatCountry(location.country)}
      </span>

      <h2 className="line-clamp-3 text-ellipsis break-all text-xl font-bold text-text">
        {formatName(name)}
      </h2>
    </div>
  )
}
