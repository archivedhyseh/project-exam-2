import { DateRange } from 'react-day-picker'
import { useSearchParams } from 'react-router-dom'
import SecondaryButton from '../../../../components/Buttons/SecondaryButton'
import TertiaryButton from '../../../../components/Buttons/TertiaryButton'

type FiltersFooterProps = {
  setIsModalOpen: (value: boolean) => void
  setSelectedRange: (value: DateRange | undefined) => void
  setTotalGuests: (value: string | undefined) => void
}

export default function FiltersFooter({
  setIsModalOpen,
  setSelectedRange,
  setTotalGuests,
}: FiltersFooterProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClearAll = () => {
    searchParams.delete('checkin')
    searchParams.delete('checkout')
    searchParams.delete('guests')

    setSelectedRange(undefined)
    setTotalGuests('')

    setSearchParams((initial) => {
      searchParams
      return initial
    })

    setIsModalOpen(false)
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        className="inline-flex justify-center gap-1 rounded-md font-semibold text-black underline hover:text-black-hover lg:rounded-lg"
        form="searchForm"
        type="button"
        onClick={() => handleClearAll()}
      >
        Clear all
      </button>

      <div className="flex justify-end gap-2">
        <TertiaryButton
          size="default"
          form="filtersForm"
          type="button"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </TertiaryButton>
        <SecondaryButton size="default" form="filtersForm" type="submit">
          Apply
        </SecondaryButton>
      </div>
    </div>
  )
}
