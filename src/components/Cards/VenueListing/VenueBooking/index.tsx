import PrimaryButton from '../../../Buttons/PrimaryButton'

type VenueBookingProps = {
  price: number
}

export default function VenueBooking({ price }: VenueBookingProps) {
  return (
    <div className="rounded-lg bg-background px-4 py-5 shadow lg:sticky lg:top-4 lg:py-4">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xl font-semibold text-text">€{price} EUR </span>
          <span className="text-xl font-normal text-text">night</span>
        </div>
        <PrimaryButton size="full">Reserve</PrimaryButton>
      </div>
    </div>
  )
}
