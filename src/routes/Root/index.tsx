import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { publicToken } from '../../api/data'
import { Errors, Venue } from '../../api/types'
import Hero from './Hero'
import Search from './Search'
import VenueCard from '../../components/Cards/VenueCard'
import Modal from '../../components/Modal'
import HostForm from '../../components/Forms/HostForm'
import HostFooter from '../../components/Forms/HostForm/HostFooter'

const fetchFeatured = async () => {
  let url =
    'https://v2.api.noroff.dev/holidaze/profiles/hyseh/venues' +
    '?limit=12' +
    '&sort=created'

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicToken}`,
      'X-Noroff-API-Key': 'b16636bb-a3d8-463c-b6c4-e230abe1b53d',
    },
  })

  const data: { data: Venue[]; errors: Errors[] } = await res.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  return data.data
}

export default function Root() {
  const accessToken = localStorage.getItem('accessToken')

  const [isHostOpen, setIsHostOpen] = useState<boolean>(false)

  const { data, error, isError, isSuccess } = useQuery({
    queryKey: ['featured'],
    queryFn: fetchFeatured,
  })

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      <div className="flex flex-col gap-4 gap-y-8">
        <Hero setIsHostOpen={setIsHostOpen} />

        <div className="mx-auto w-full max-w-screen-md">
          <Search />
        </div>

        <hr className="border-black-alt" />

        {isError && <span className="text-text">{error.message}</span>}

        {isSuccess && (
          <>
            <div className="grid auto-rows-fr gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {data.map(({ id, name, media, price, location }) => (
                <VenueCard
                  key={id}
                  id={id}
                  name={name}
                  media={media}
                  price={price}
                  location={location}
                />
              ))}
            </div>

            <div className="grid gap-4">
              <h3 className="text-balance text-center text-xl font-semibold text-text">
                Ready to discover or share your space?
              </h3>

              <div className="flex flex-col justify-center gap-2 gap-x-4 sm:flex-row">
                <Link
                  to="/venues"
                  className="inline-flex w-full justify-center gap-2 rounded-full bg-brand px-3 py-2 font-bold text-white hover:bg-brand-hover sm:max-w-40 lg:px-5 lg:py-3"
                >
                  Browse venues
                </Link>

                {accessToken ? (
                  <button
                    onClick={() => setIsHostOpen(true)}
                    className="inline-flex w-full justify-center gap-1 rounded-full bg-black px-3 py-2 font-bold text-white hover:bg-black-hover sm:max-w-40 lg:px-5 lg:py-3"
                  >
                    Start hosting
                  </button>
                ) : (
                  <Link
                    to="/signup"
                    className="inline-flex w-full justify-center gap-1 rounded-full bg-black px-3 py-2 font-bold text-white hover:bg-black-hover sm:max-w-40 lg:px-5 lg:py-3"
                  >
                    Start hosting
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        isModalOpen={isHostOpen}
        setIsModalOpen={setIsHostOpen}
        modalFooter={<HostFooter setIsHostOpen={setIsHostOpen} />}
      >
        <HostForm setIsHostOpen={setIsHostOpen} />
      </Modal>
    </div>
  )
}
