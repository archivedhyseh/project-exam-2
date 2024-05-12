import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import Modal from '../../../components/Modal'
import FiltersButton from './FiltersButton'
import FiltersMenu from './FiltersMenu'
import FiltersFooter from './FiltersFooter'

export default function Filters() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
  const [totalGuests, setTotalGuests] = useState<string | undefined>('')

  return (
    <>
      <FiltersButton setIsModalOpen={setIsModalOpen} />

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalFooter={
          <FiltersFooter
            setIsModalOpen={setIsModalOpen}
            setSelectedRange={setSelectedRange}
            setTotalGuests={setTotalGuests}
          />
        }
      >
        <FiltersMenu
          setIsModalOpen={setIsModalOpen}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          totalGuests={totalGuests}
          setTotalGuests={setTotalGuests}
        />
      </Modal>
    </>
  )
}
