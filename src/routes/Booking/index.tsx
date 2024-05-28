import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Errors, Venue } from '../../api/types'
import BookingCard from '../../components/Cards/BookingCard'
import BookingDetails from './BookingDetails'
import BookingForm from '../../components/Forms/BookingForm'

type fetchListingProps = {
  id: string | undefined
}

const fetchListing = async ({ id }: fetchListingProps) => {
  let url = 'https://v2.api.noroff.dev/holidaze/venues' + `/${id}`

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

export default function Booking() {
  const { id } = useParams()

  const { data, error, isSuccess, isError } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListing({ id }),
  })

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      {isError && <span className="text-text">{error.message}</span>}

      {isSuccess && (
        <div className="grid gap-4 gap-y-8 lg:grid-cols-2">
          <div className="lg:order-2 lg:col-span-1">
            <BookingCard
              name={data.name}
              media={data.media}
              price={data.price}
              location={data.location}
            />
          </div>

          <div className="grid gap-8 lg:order-1 lg:col-span-1">
            <h1 className="text-3xl font-bold text-text">Confirm and pay</h1>

            <BookingDetails />

            <hr className="border-black-alt" />

            <BookingForm />

            <hr className="border-black-alt" />
          </div>
        </div>
      )}
    </div>
  )
}
