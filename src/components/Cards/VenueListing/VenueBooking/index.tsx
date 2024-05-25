import { differenceInDays, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'
import { Bookings } from '../../../../api/types'
import Modal from '../../../Modal'
import BookingButton from './BookingButton'
import BookingFooter from './BookingForm/BookingFooter'
import BookingForm from './BookingForm'
import BookingPricing from './BookingPricing'

type VenueBookingProps = {
  bookings?: Bookings[]
  price: number
  maxGuests: number
}

export default function VenueBooking({
  bookings,
  price,
  maxGuests,
}: VenueBookingProps) {
  const [searchParams] = useSearchParams()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
  const [totalGuests, setTotalGuests] = useState<string | undefined>('')
  const [totalNights, setTotalNights] = useState<number>(1)

  useEffect(() => {
    const checkin = searchParams.get('checkin')
    const checkout = searchParams.get('checkout')
    const guests = searchParams.get('guests')

    if (checkin && checkout && guests) {
      setSelectedRange({
        from: new Date(parseISO(checkin)),
        to: new Date(parseISO(checkout)),
      })

      setTotalGuests(guests || '')

      const totalDays = differenceInDays(checkout, checkin)
      if (totalDays > 1) {
        setTotalNights(totalDays)
      } else {
        setTotalNights(1)
      }
    }
  }, [searchParams])

  return (
    <div className="max-w-screen-md lg:sticky lg:top-4 lg:max-w-none lg:rounded-lg lg:bg-background-body lg:px-4 lg:py-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-text">Add booking details</h2>

        <BookingButton setIsModalOpen={setIsModalOpen} />

        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalFooter={
            <BookingFooter
              setIsModalOpen={setIsModalOpen}
              setSelectedRange={setSelectedRange}
              setTotalGuests={setTotalGuests}
            />
          }
        >
          <BookingForm
            bookings={bookings}
            maxGuests={maxGuests}
            setIsModalOpen={setIsModalOpen}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            totalGuests={totalGuests}
            setTotalGuests={setTotalGuests}
          />
        </Modal>

        <BookingPricing
          price={price}
          totalNights={totalNights}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  )
}
