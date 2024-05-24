import { Venue } from '../../../api/types'
import ManageCard from '../../../components/Cards/ManageCard'

type ManageVenuesProps = {
  venues: Venue[]
}

export default function ManageVenues({ venues }: ManageVenuesProps) {
  venues.sort((a, b) => {
    const createdA = Date.parse(a.created)
    const createdB = Date.parse(b.created)

    return createdA - createdB
  })

  return (
    <>
      {venues.length > 0 ? (
        <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {venues.map((venue) => (
            <ManageCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <span className="text-text">You do not have any venues to manage.</span>
      )}
    </>
  )
}
