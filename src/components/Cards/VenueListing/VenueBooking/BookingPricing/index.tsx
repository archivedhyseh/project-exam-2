import { Link, useParams, useSearchParams } from 'react-router-dom'
import PrimaryButton from '../../../../Buttons/PrimaryButton'

type BookingPricingProps = {
  price: number
  totalNights: number
  setIsModalOpen: (value: boolean) => void
}

export default function BookingPricing({
  price,
  totalNights,
  setIsModalOpen,
}: BookingPricingProps) {
  const [searchParams] = useSearchParams()

  const { id } = useParams()
  const checkin = searchParams.get('checkin')
  const checkout = searchParams.get('checkout')
  const guests = searchParams.get('guests')

  return (
    <>
      {checkin && checkout && guests ? (
        <Link
          to={`/book/${id}?${searchParams}`}
          className="inline-flex w-full justify-center gap-1 rounded-full bg-brand px-3 py-2 font-bold text-white hover:bg-brand-hover lg:px-5 lg:py-3"
        >
          Start booking
        </Link>
      ) : (
        <PrimaryButton size="full" onClick={() => setIsModalOpen(true)}>
          Add details
        </PrimaryButton>
      )}

      {checkin && checkout && guests ? (
        <>
          {totalNights > 1 && (
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
          )}

          <hr className="border-black-alt" />

          <div className="flex justify-between">
            <span className="text-xl font-semibold text-text">Total </span>

            <div>
              <span className="text-xl font-semibold text-text">
                €{price * totalNights}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <hr className="border-black-alt" />

          <div className="flex justify-between">
            <span className="text-text">Pricing </span>

            <div>
              <span className="font-semibold text-text">€{price} </span>
              <span className="font-normal text-text">night</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}
