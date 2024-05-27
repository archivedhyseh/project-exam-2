import { useQuery } from '@tanstack/react-query'
import { Errors, Profile } from '../../../../api/types'
import ProfileForm from '../../../Forms/ProfileForm'
import ProfileCard from '../../../Cards/ProfileCard'

const fetchProfile = async () => {
  const accessToken = localStorage.getItem('accessToken')
  const username = localStorage.getItem('name')

  let url = 'https://v2.api.noroff.dev/holidaze/profiles' + `/${username}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': 'b16636bb-a3d8-463c-b6c4-e230abe1b53d',
    },
  })

  const data: { data: Profile; errors: Errors[] } = await res.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  return data.data
}

type ProfileMenuProps = {
  setIsProfileOpen: (value: boolean) => void
}

export default function ProfileMenu({ setIsProfileOpen }: ProfileMenuProps) {
  const { data, error, isSuccess, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  })

  return (
    <>
      {isError && <span>{error.message}</span>}

      {isSuccess && (
        <div className="flex flex-col gap-8">
          <ProfileCard
            avatar={data.avatar}
            name={data.name}
            email={data.email}
            bio={data.bio}
          />

          <hr className="border-black-alt" />

          <ProfileForm profile={data} setIsProfileOpen={setIsProfileOpen} />
        </div>
      )}
    </>
  )
}
