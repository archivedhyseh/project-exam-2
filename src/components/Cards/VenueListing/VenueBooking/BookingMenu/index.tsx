import {
  addYears,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
} from 'date-fns'
import { FormEvent } from 'react'
import { DateRange } from 'react-day-picker'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Bookings } from '../../../../../api/types'
import Calendar from '../../../../Calendar'
import Input from './Input'

type BookingMenuProps = {
  bookings?: Bookings[]
  maxGuests: number
  setIsModalOpen: (value: boolean) => void
  selectedRange: DateRange | undefined
  setSelectedRange: (value: DateRange | undefined) => void
  totalGuests: string | undefined
  setTotalGuests: (value: string | undefined) => void
}

export default function BookingMenu({
  bookings,
  maxGuests,
  setIsModalOpen,
  selectedRange,
  setSelectedRange,
  totalGuests,
  setTotalGuests,
}: BookingMenuProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

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
      </div>

      <Input
        type="number"
        labelTitle="Guests"
        labelDescription="How many are staying?"
        placeholder="2"
        id="guests"
        min={1}
        max={maxGuests}
        value={totalGuests}
        onChange={(e) => setTotalGuests(e.target.value)}
      />
    </form>
  )
}
