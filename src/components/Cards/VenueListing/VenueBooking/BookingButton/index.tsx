import { format } from 'date-fns'
import { useSearchParams } from 'react-router-dom'

type BookingButtonProps = {
  setIsModalOpen: (value: boolean) => void
}

export default function BookingButton({ setIsModalOpen }: BookingButtonProps) {
  const [searchParams] = useSearchParams()

  const checkin = searchParams.get('checkin')
  const checkout = searchParams.get('checkout')
  const guests = searchParams.get('guests')

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-0 h-full w-full rounded-md lg:rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="sr-only">Open booking modal</span>
      </button>

      <div className="flex flex-col rounded-md bg-black-alt lg:rounded-lg">
        <div className="grid grid-cols-2 gap-[1px]">
          <div className="rounded-tl-md border-l border-t border-black-alt bg-background px-3 py-2 lg:rounded-tl-lg lg:py-3">
            {checkin ? (
              <span className="text-text">{format(checkin, 'dd/MM/yyyy')}</span>
            ) : (
              <span className="text-text-muted">Checkin</span>
            )}
          </div>

          <div className="rounded-tr-md border-r border-t border-black-alt bg-background px-3 py-2 lg:rounded-tr-lg lg:py-3">
            {checkout ? (
              <span className="text-text">
                {format(checkout, 'dd/MM/yyyy')}
              </span>
            ) : (
              <span className="text-text-muted">Checkout</span>
            )}
          </div>

          <div className="col-span-2 rounded-b-md border-b border-l border-r border-black-alt bg-background px-3 py-2 lg:rounded-b-lg lg:py-3">
            {guests ? (
              <span className="text-text">
                {guests === '1' ? `${guests} guest` : `${guests} guests`}
              </span>
            ) : (
              <span className="text-text-muted">Guests</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
