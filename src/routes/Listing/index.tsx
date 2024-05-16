import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Errors, Venue } from '../../api/types'
import VenueListing from '../../components/Cards/VenueListing'

export default function Listing() {
  const { id } = useParams()

  const { data, error, isSuccess, isError } = useQuery({
    queryKey: ['listing'],
    queryFn: async () => {
      const res = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const { data, errors }: { data: Venue; errors: Errors[] } =
        await res.json()

      if (errors) {
        throw new Error(errors[0].message)
      }

      return data
    },
  })

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      {isError && <span>{error.message}</span>}
      {isSuccess && (
        <VenueListing
          name={data.name}
          description={data.description}
          media={data.media}
          price={data.price}
          maxGuests={data.maxGuests}
          rating={data.rating}
          meta={data.meta}
          location={data.location}
          owner={data.owner}
          bookings={data.bookings}
        />
      )}
    </div>
  )
}
