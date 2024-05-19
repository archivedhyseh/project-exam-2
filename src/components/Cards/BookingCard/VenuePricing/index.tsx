import { differenceInDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type VenuePricingProps = {
  price: number
}

export default function VenuePricing({ price }: VenuePricingProps) {
  const [searchParams] = useSearchParams()

  const [totalNights, setTotalNights] = useState<number>(1)

  useEffect(() => {
    const checkin = searchParams.get('checkin')
    const checkout = searchParams.get('checkout')

    if (checkin && checkout) {
      const totalDays = differenceInDays(checkout, checkin)
      if (totalDays > 1) {
        setTotalNights(totalDays)
      } else {
        setTotalNights(1)
      }
    }
  }, [searchParams])

  return (
    <div className="grid gap-4">
      {totalNights > 1 && (
        <>
          <h2 className="text-xl font-semibold text-text">Price details</h2>

          <div className="flex justify-between">
            <span>
              €{price} x {totalNights} nights
            </span>

            <div>
              <span className="font-semibold text-text">
                €{price * totalNights}
              </span>
            </div>
          </div>

          <hr className="border-black-alt" />
        </>
      )}

      <div className="flex justify-between">
        <span className="text-xl font-semibold text-text">Total </span>

        <div>
          <span className="text-xl font-semibold text-text">
            €{price * totalNights}
          </span>
        </div>
      </div>
    </div>
  )
}
