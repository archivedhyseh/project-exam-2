import { FormEvent, useEffect } from 'react'
import { DateRange } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'
import { addYears, format, parseISO } from 'date-fns'
import Calendar from '../../../../components/Calendar'
import Input from './Input'

type FiltersMenuProps = {
  setIsModalOpen: (value: boolean) => void
  selectedRange: DateRange | undefined
  setSelectedRange: (value: DateRange | undefined) => void
  totalGuests: string | undefined
  setTotalGuests: (value: string | undefined) => void
}

export default function FiltersMenu({
  setIsModalOpen,
  selectedRange,
  setSelectedRange,
  totalGuests,
  setTotalGuests,
}: FiltersMenuProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const checkin = searchParams.get('checkin')
    const checkout = searchParams.get('checkout')

    if (checkin && checkout) {
      setSelectedRange({
        from: new Date(parseISO(checkin)),
        to: new Date(parseISO(checkout)),
      })
    }

    setTotalGuests(searchParams.get('guests') || '')
  }, [])

  const currentDate = new Date()
  const fromDate = currentDate
  const toDate = addYears(currentDate, 2)

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedRange) {
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
    } else {
      searchParams.delete('checkin')
      searchParams.delete('checkout')
    }

    if (totalGuests && totalGuests !== '0') {
      const guests = totalGuests

      searchParams.set('guests', guests)
    } else {
      searchParams.delete('guests')
    }

    setSearchParams((initial) => {
      searchParams
      return initial
    })

    setIsModalOpen(false)
  }

  return (
    <form
      id="filtersForm"
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
          onSelect={setSelectedRange}
          fromDate={fromDate}
          toDate={toDate}
        />
      </div>

      <Input
        type="number"
        labelTitle="Guests"
        labelDescription="How many are staying?"
        placeholder="2"
        id="guests"
        min={0}
        value={totalGuests}
        onChange={(e) => setTotalGuests(e.target.value)}
      />
    </form>
  )
}
