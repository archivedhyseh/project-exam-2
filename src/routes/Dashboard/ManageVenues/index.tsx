import { Venue } from '../../../api/types'
import VenueCard from '../../../components/Cards/VenueCard'

type ManageVenuesProps = {
  venues: Venue[]
}

export default function ManageVenues({ venues }: ManageVenuesProps) {
  if (venues) {
    venues.sort((a, b) => {
      const createdA = Date.parse(a.created)
      const createdB = Date.parse(b.created)

      return createdA - createdB
    })
  }

  return (
    <>
      {venues.length > 0 ? (
        <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {venues.map(({ id, name, media, price, location }) => (
            <VenueCard
              key={id}
              id={id}
              name={name}
              media={media}
              price={price}
              location={location}
            />
          ))}
        </div>
      ) : (
        <span className="text-text">You do not have any venues to manage.</span>
      )}
    </>
  )
}
