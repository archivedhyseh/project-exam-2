import { DateRange } from 'react-day-picker'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import TertiaryButton from '../../../../Buttons/TertiaryButton'
import SecondaryButton from '../../../../Buttons/SecondaryButton'

type BookingFooterProps = {
  setIsModalOpen: (value: boolean) => void
  setSelectedRange: (value: DateRange | undefined) => void
  setTotalGuests: (value: string | undefined) => void
}

export default function BookingFooter({
  setIsModalOpen,
  setSelectedRange,
  setTotalGuests,
}: BookingFooterProps) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const handleClearAll = () => {
    setSelectedRange(undefined)
    setTotalGuests('')

    searchParams.delete('checkin')
    searchParams.delete('checkout')
    searchParams.delete('guests')

    navigate(`${location.pathname}?${searchParams}`, { replace: true })
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setSelectedRange(undefined)
    setTotalGuests('')

    setIsModalOpen(false)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        className="inline-flex justify-center gap-1 rounded-md font-semibold text-black underline hover:text-black-hover lg:rounded-lg"
        form="bookingForm"
        type="button"
        onClick={() => handleClearAll()}
      >
        Clear all
      </button>

      <div className="flex justify-end gap-2">
        <TertiaryButton
          size="default"
          form="bookingForm"
          type="button"
          onClick={() => handleCancel()}
        >
          Cancel
        </TertiaryButton>
        <SecondaryButton size="default" form="bookingForm" type="submit">
          Apply
        </SecondaryButton>
      </div>
    </div>
  )
}
