import { Profile } from '../../../../../api/types'

type VenueHostProps = {
  owner?: Profile
}

export default function VenueHost({ owner }: VenueHostProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12">
        <img
          src={owner?.avatar.url}
          alt=""
          className="aspect-square h-full w-full overflow-hidden rounded-full"
        />
      </div>
      <span className="font-bold text-text">Hosted by {owner?.name}</span>
    </div>
  )
}
