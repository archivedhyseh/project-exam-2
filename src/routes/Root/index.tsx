import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from './Hero'
import Search from './Search'
import Featured from './Featured'
import Modal from '../../components/Modal'
import HostForm from '../../components/Forms/HostForm'
import HostFooter from '../../components/Forms/HostForm/HostFooter'

export default function Root() {
  const [isHostOpen, setIsHostOpen] = useState<boolean>(false)

  const accessToken = localStorage.getItem('accessToken')

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-4">
      <div className="flex flex-col gap-4 gap-y-8">
        <Hero setIsHostOpen={setIsHostOpen} />

        <div className="mx-auto w-full max-w-screen-md">
          <Search />
        </div>

        <hr className="border-black-alt" />

        <Featured />

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
