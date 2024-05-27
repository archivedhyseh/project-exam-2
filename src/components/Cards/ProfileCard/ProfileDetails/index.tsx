type ProfileDetailsProps = {
  name: string
  email: string
  bio: string
}

export default function ProfileDetails({
  name,
  email,
  bio,
}: ProfileDetailsProps) {
  return (
    <>
      <div className="grid">
        <h1 className="text-center text-3xl font-bold text-text">{name}</h1>
        <span className="text-center text-text-muted">{email}</span>
      </div>

      {bio && bio.trim().length > 1 ? (
        <p className="text-balance text-center text-text">{bio}</p>
      ) : (
        <p className="text-balance text-center text-text">No bio yet.</p>
      )}
    </>
  )
}
