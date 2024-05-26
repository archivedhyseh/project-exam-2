import { useQuery } from '@tanstack/react-query'
import { Errors, Venue } from '../../../api/types'
import VenueCard from '../../../components/Cards/VenueCard'

const fetchFeatured = async () => {
  let url =
    'https://v2.api.noroff.dev/holidaze/venues' + '?limit=12' + '&sort=created'

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data: { data: Venue[]; errors: Errors[] } = await res.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  return data.data
}

export default function Featured() {
  const { data, error, isError, isSuccess } = useQuery({
    queryKey: ['featured'],
    queryFn: fetchFeatured,
  })

  return (
    <div className="grid gap-4">
      {isError && <span>{error.message}</span>}

      <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {isSuccess &&
          data.map(({ id, name, media, price, location }) => (
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
    </div>
  )
}
