import VenueHeading from './VenueHeading'
import VenueImage from './VenueImage'
import VenuePricing from './VenuePricing'

type BookingCardProps = {
  name: string
  media: { url: string; alt: string }[]
  price: number
  location: {
    address: string
    city: string
    zip: string
    country: string
    continent: string
    lat: number
    lng: number
  }
}

export default function BookingCard({
  name,
  media,
  price,
  location,
}: BookingCardProps) {
  return (
    <div className="lg:sticky lg:top-4 lg:rounded-lg lg:bg-background-body lg:px-4 lg:py-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <VenueImage media={media} name={name} />
          <VenueHeading name={name} location={location} />
        </div>

        <hr className="border-black-alt" />

        <VenuePricing price={price} />
      </div>
    </div>
  )
}
