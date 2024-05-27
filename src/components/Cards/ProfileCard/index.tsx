import ProfileAvatar from './ProfileAvatar'
import ProfileDetails from './ProfileDetails'

type ProfileCardProps = {
  avatar: { url: string; alt: string }
  name: string
  email: string
  bio: string
}

export default function ProfileCard({
  avatar,
  name,
  email,
  bio,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <ProfileAvatar avatar={avatar} />

      <ProfileDetails name={name} email={email} bio={bio} />
    </div>
  )
}
