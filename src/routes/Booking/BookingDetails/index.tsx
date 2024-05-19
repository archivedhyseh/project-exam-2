import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function BookingDetails() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { id } = useParams()

  const [bookingRange, setBookingRange] = useState<string | undefined>()
  const [totalGuests, setTotalGuests] = useState<string | undefined>()

  useEffect(() => {
    const checkin = searchParams.get('checkin')
    const checkout = searchParams.get('checkout')
    const guests = searchParams.get('guests')

    if (checkin && checkout && guests) {
      setBookingRange(
        format(checkin, 'dd LLL yyyy') + ' - ' + format(checkout, 'dd LLL yyyy')
      )

      if (parseFloat(guests) > 1) {
        setTotalGuests(guests + ' guests')
      } else {
        setTotalGuests(guests + ' guest')
      }
    } else {
      navigate(`/venue/${id}`, { replace: true })
    }
  }, [searchParams])

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold text-text">Trip details</h2>

      <div className="flex flex-col">
        <h3 className="font-semibold text-text">Dates</h3>
        <span className="text-text">{bookingRange}</span>
      </div>

      <div className="flex flex-col">
        <h3 className="font-semibold text-text">Guests</h3>
        <span className="text-text">{totalGuests}</span>
      </div>
    </div>
  )
}
