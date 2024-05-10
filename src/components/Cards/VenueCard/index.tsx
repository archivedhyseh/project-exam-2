import { Link } from 'react-router-dom'
import VenueImage from './VenueImage'
import VenueDetails from './VenueDetails'

type VenueCardProps = {
  id: string
  name: string
  media: { url: string; alt: string }[]
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

export default function VenueCard({
  id,
  name,
  media,
  price,
  location,
}: VenueCardProps) {
  return (
    <div className="relative flex flex-col gap-2">
      <Link
        to={`/venue/${id}`}
        className="absolute left-0 top-0 h-full w-full rounded-lg"
      />
      <VenueImage media={media} name={name} />
      <VenueDetails name={name} price={price} location={location} />
    </div>
  )
}
