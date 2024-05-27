type ProfileAvatarProps = {
  avatar: { url: string; alt: string }
  name: string
}

export default function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
  return (
    <div className="flex justify-center">
      <div className="h-full max-h-24 w-full max-w-24 sm:max-h-32 sm:max-w-32">
        <img
          src={avatar.url}
          alt={avatar.alt || `Image of ${name}'s avatar`}
          className="aspect-square h-full w-full overflow-hidden rounded-full object-cover"
        />
      </div>
    </div>
  )
}
