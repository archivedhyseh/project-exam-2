import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Errors, Venue } from '../../api/types'
import VenueListing from '../../components/Cards/VenueListing'

type fetchListingProps = {
  id: string | undefined
}

const fetchListing = async ({ id }: fetchListingProps) => {
  let url =
    'https://v2.api.noroff.dev/holidaze/venues' +
    `/${id}` +
    '?_owner=true' +
    '&_bookings=true'

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const { data, errors }: { data: Venue; errors: Errors[] } = await res.json()

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data
}

export default function Listing() {
  const { id } = useParams()

  const { data, error, isSuccess, isError } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListing({ id }),
  })

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      {isError && <span>{error.message}</span>}
      {isSuccess && <VenueListing venue={data} />}
    </div>
  )
}
