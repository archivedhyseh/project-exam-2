import { useQuery } from '@tanstack/react-query'
import { Errors, Profile } from '../../api/types'
import Tabs from '../../components/Tabs'
import ManageVenues from './ManageVenues'
import MyBookings from './MyBookings'

const fetchProfile = async () => {
  const accessToken = localStorage.getItem('accessToken')
  const username = localStorage.getItem('name')

  let url =
    'https://v2.api.noroff.dev/holidaze/profiles' +
    `/${username}` +
    '?_bookings=true' +
    '&_venues=true'

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

export default function Dashboard() {
  const { data, error, isSuccess, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchProfile,
  })

  const tabsData = [
    {
      label: 'My bookings',
      element: isSuccess && <MyBookings bookings={data.bookings} />,
    },
    {
      label: 'Manage venues',
      element: isSuccess && <ManageVenues venues={data.venues} />,
    },
  ]

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      {isError && <span>{error.message}</span>}

      <div className="flex flex-col gap-4 gap-y-8">
        {isSuccess && <Tabs tabsData={tabsData} />}
      </div>
    </div>
  )
}
