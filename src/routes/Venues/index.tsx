import { useQuery } from '@tanstack/react-query'
import VenueCard from '../../components/Cards/VenueCard'
import { Errors, Venue } from '../../api/types'

export default function Venues() {
  const { data, error, isSuccess, isError } = useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      const res = await fetch(
        'https://v2.api.noroff.dev/holidaze/venues?limit=60&sort=created',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const { data, errors }: { data: Venue[]; errors: Errors[] } =
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
      <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {isSuccess &&
          data.map(({ id, name, media, price, location }) => {
            return (
              <VenueCard
                key={id}
                id={id}
                name={name}
                media={media}
                price={price}
                location={location}
              />
            )
          })}
      </div>
    </div>
  )
}
