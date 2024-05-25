import {
  addYears,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
} from 'date-fns'
import { FormEvent, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Bookings } from '../../../../../api/types'
import Calendar from '../../../../Calendar'

type BookingFormProps = {
  bookings?: Bookings[]
  maxGuests: number
  setIsModalOpen: (value: boolean) => void
  selectedRange: DateRange | undefined
  setSelectedRange: (value: DateRange | undefined) => void
  totalGuests: string | undefined
  setTotalGuests: (value: string | undefined) => void
}

export default function BookingForm({
  bookings,
  maxGuests,
  setIsModalOpen,
  selectedRange,
  setSelectedRange,
  totalGuests,
  setTotalGuests,
}: BookingFormProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [isBookingError, setIsBookingError] = useState<boolean>(false)
  const [isGuestsError, setIsGuestsError] = useState<boolean>(false)

  const currentDate = new Date()
  const fromDate = currentDate
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
    let isAlreadyBooked = false

    if (range) {
      if (range.from && range.to) {
        const checkin = startOfDay(range.from)
        const checkout = endOfDay(range.to)

        for (const booking of bookedDays) {
          const bookedCheckin = startOfDay(booking.from)
          const bookedCheckout = endOfDay(booking.to)

          if (
            isAfter(bookedCheckin, checkin) &&
            isBefore(bookedCheckout, checkout)
          ) {
            isAlreadyBooked = true
            break
          }
        }
      }
    }

    if (isAlreadyBooked) {
      setSelectedRange({ from: selectedDate, to: undefined })
    } else {
      setSelectedRange(range)
    }
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedRange) {
      setIsBookingError(true)
    } else {
      setIsBookingError(false)
    }

    if (!totalGuests) {
      setIsGuestsError(true)
    } else {
      setIsGuestsError(false)
    }

    if (selectedRange && totalGuests) {
      const { from, to } = selectedRange

      if (from && to) {
        const checkin = format(from, 'yyyy-MM-dd')
        const checkout = format(to, 'yyyy-MM-dd')

        searchParams.set('checkin', checkin)
        searchParams.set('checkout', checkout)
      } else {
        searchParams.delete('checkin')
        searchParams.delete('checkout')
      }

      if (totalGuests !== '0') {
        const guests = totalGuests

        searchParams.set('guests', guests)
      } else {
        searchParams.delete('guests')
      }

      navigate(`${location.pathname}?${searchParams}`, { replace: true })
      setIsModalOpen(false)
    }
  }

  return (
    <form
      id="bookingForm"
      onSubmit={(e) => handleOnSubmit(e)}
      className="flex flex-col gap-4 gap-y-8"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-text">Booking</span>
          <span className="text-text-muted">When are you staying?</span>
        </div>

        <Calendar
          selected={selectedRange}
          onSelect={handleSelectRange}
          fromDate={fromDate}
          toDate={toDate}
          disabled={disabledDays}
        />

        {isBookingError && (
          <span className="text-text">Booking is required.</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="guests" className="flex flex-col">
          <span className="text-xl font-semibold text-text">Guests</span>
          <span className="text-text-muted">How many is staying?</span>
        </label>

        <input
          type="number"
          placeholder="2"
          id="guests"
          min={1}
          max={maxGuests}
          value={totalGuests}
          onChange={(e) => setTotalGuests(e.target.value)}
          className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted md:rounded-lg lg:px-5 lg:py-3"
        />

        {isGuestsError && (
          <span className="text-text">Guests is required.</span>
        )}
      </div>
    </form>
  )
}
