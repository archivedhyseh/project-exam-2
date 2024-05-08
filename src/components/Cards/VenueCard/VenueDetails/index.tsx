type VenueDetailsProps = {
  name: string
  price: number
}

export default function VenueDetails({ name, price }: VenueDetailsProps) {
  return (
    <div>
      <div>
        <span className="line-clamp-1 text-ellipsis break-all font-bold text-text">
          {name.trim().length > 1 ? name : 'No name for venue'}
        </span>
      </div>
      <div>
        <span className="font-semibold text-text">€{price} EUR </span>
        <span className="font-normal text-text">night</span>
      </div>
    </div>
  )
}
