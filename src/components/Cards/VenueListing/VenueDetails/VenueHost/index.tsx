import { Profile } from '../../../../../api/types'

type VenueHostProps = {
  owner?: Profile
}

export default function VenueHost({ owner }: VenueHostProps) {
  return (
    <div className="flex max-w-screen-md items-center gap-2">
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
