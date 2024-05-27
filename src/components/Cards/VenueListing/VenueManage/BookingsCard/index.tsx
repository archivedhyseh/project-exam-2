import { format } from 'date-fns'
import { Profile } from '../../../../../api/types'

type BookingsCardProps = {
  dateFrom: string
  dateTo: string
  guests: number
  customer: Profile
}

export default function BookingsCard({
  dateFrom,
  dateTo,
  guests,
  customer,
}: BookingsCardProps) {
  const checkin = format(dateFrom, 'dd LLL yyyy')
  const checkout = format(dateTo, 'dd LLL yyyy')

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-text">Customer</h3>
        <span className="text-text">{customer.name}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="font-semibold text-text">Dates</h3>

          <span className="text-text">
            {checkin} - {checkout}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-text">Guests</h3>

          <span className="text-text">
            {guests === 1 ? `${guests} guest` : `${guests} guests`}
          </span>
        </div>
      </div>
    </div>
  )
}
