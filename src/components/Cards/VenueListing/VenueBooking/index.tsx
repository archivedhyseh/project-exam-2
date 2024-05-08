import { useState } from 'react'
import { Bookings } from '../../../../api/types'
import { DateRange } from 'react-day-picker'
import { addYears, isAfter, isBefore } from 'date-fns'
import PrimaryButton from '../../../Buttons/PrimaryButton'
import Modal from '../../../Modal'
import VenueCalendar from './VenueCalendar'

type VenueBookingProps = {
  bookings?: Bookings[]
  price: number
}

export default function VenueBooking({ bookings, price }: VenueBookingProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const currentDate = new Date()
  const fromMonth = currentDate
  const toDate = addYears(currentDate, 2)
  const bookedDays =
    bookings?.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    })) || []
  const disabledDays = [{ before: currentDate }, ...bookedDays]

  const handleSelectRange = (
    range: DateRange | undefined,
    selectedDate: Date
  ) => {
    let isDisabledDay = false

    if (range) {
      for (let i = 0; i < bookedDays.length; i++) {
        if (
          isAfter(bookedDays[i].from, range.from!) &&
          isBefore(bookedDays[i].to, range.to!)
        ) {
          isDisabledDay = true
          break
        }
      }
    }

    if (isDisabledDay) {
      setSelectedRange({ from: selectedDate, to: undefined })
    } else {
      setSelectedRange(() => range)
    }
  }

  return (
    <div className="max-w-lg lg:sticky lg:top-4 lg:rounded-lg lg:bg-background-body lg:px-4 lg:py-5">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <button
            className="absolute left-0 top-0 h-full w-full rounded-md lg:rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="sr-only">Open booking modal</span>
          </button>
          <div className="flex">
            <div className="w-full rounded-l-md border border-black-alt bg-background px-3 py-2 text-text-muted lg:rounded-l-lg lg:py-3">
              <span>DD/MM/YYYY</span>
            </div>
            <div className="w-full rounded-r-md border border-black-alt bg-background px-3 py-2 text-text-muted lg:rounded-r-lg lg:py-3">
              <span>DD/MM/YYYY</span>
            </div>
          </div>
        </div>

        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <VenueCalendar
            selected={selectedRange}
            onSelect={handleSelectRange}
            fromMonth={fromMonth}
            toDate={toDate}
            disabled={disabledDays}
          />
        </Modal>

        <PrimaryButton size="full">Reserve</PrimaryButton>
      </div>
    </div>
  )
}
