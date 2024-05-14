import { parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'
import { Bookings } from '../../../../api/types'
import Modal from '../../../Modal'
import BookingButton from './BookingButton'
import BookingFooter from './BookingFooter'
import BookingMenu from './BookingMenu'
import PrimaryButton from '../../../Buttons/PrimaryButton'

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
    }
  }, [])

  return (
    <div className="lg:sticky lg:top-4 lg:rounded-lg lg:bg-background-body lg:px-4 lg:py-5">
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
          <BookingMenu
            bookings={bookings}
            maxGuests={maxGuests}
            setIsModalOpen={setIsModalOpen}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            totalGuests={totalGuests}
            setTotalGuests={setTotalGuests}
          />
        </Modal>

        <PrimaryButton size="full">Check availability</PrimaryButton>

        <hr className="border-black-alt" />

        <div>
          <span className="text-xl font-semibold text-text">€{price} </span>
          <span className="text-xl font-normal text-text">night</span>
        </div>
      </div>
    </div>
  )
}
