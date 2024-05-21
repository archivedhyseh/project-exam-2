import { Link } from 'react-router-dom'
import { Venue } from '../../../api/types'
import VenueImage from './VenueImage'
import VenueDetails from './VenueDetails'

type UpcomingCardProps = {
  dateFrom: string
  dateTo: string
  venue: Venue
}

export default function UpcomingCard({
  dateFrom,
  dateTo,
  venue,
}: UpcomingCardProps) {
  return (
    <div className="relative flex flex-col gap-2">
      <Link
        to={`/venue/${venue.id}`}
        className="absolute left-0 top-0 h-full w-full rounded-lg"
      />
      <VenueImage media={venue.media} name={venue.name} />
      <VenueDetails
        name={venue.name}
        dateFrom={dateFrom}
        dateTo={dateTo}
        location={venue.location}
      />
    </div>
  )
}
