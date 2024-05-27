import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Venue } from '../../../../api/types'
import SecondaryButton from '../../../Buttons/SecondaryButton'
import Modal from '../../../Modal'
import ManageForm from '../../../Forms/ManageForm'
import ManageFooter from '../../../Forms/ManageForm/ManageFooter'
import BookingsList from './BookingsList'

type fetchDeleteProps = {
  id: string
}

const fetchDelete = async ({ id }: fetchDeleteProps) => {
  const accessToken = localStorage.getItem('accessToken')

  let url = 'https://v2.api.noroff.dev/holidaze/venues' + `/${id}`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': 'b16636bb-a3d8-463c-b6c4-e230abe1b53d',
    },
  })

  const { errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
}

type VenueManageProps = {
  venue: Venue
}

export default function VenueManage({ venue }: VenueManageProps) {
  const navigate = useNavigate()

  const [isBookingsOpen, setIsBookingsOpen] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  useEffect(() => {
    setIsConfirming(false)
  }, [])

  const { mutate } = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      navigate('/', { replace: true })
    },
  })

  const handleDelete = () => {
    if (isConfirming) {
      mutate({ id: venue.id })
    } else {
      setIsConfirming(true)

      setTimeout(() => {
        setIsConfirming(false)
      }, 2000)
    }
  }

  return (
    <div className="max-w-screen-md lg:sticky lg:top-4 lg:max-w-none lg:rounded-lg lg:bg-background-body lg:px-4 lg:py-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-text">Manage your venue</h2>

        <div className="grid gap-1">
          <div className="flex justify-between">
            <span className="text-text">Pricing </span>

            <div>
              <span className="font-semibold text-text">€{venue.price} </span>
              <span className="font-normal text-text">night</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-text">Bookings </span>

            <div>
              <button
                className="inline-flex justify-center gap-1 rounded-md font-semibold text-text hover:text-text-muted lg:rounded-lg"
                onClick={() => setIsBookingsOpen(true)}
              >
                <span>View bookings</span>
              </button>
            </div>
          </div>
        </div>

        <hr className="border-black-alt" />

        <div className="flex items-center justify-between gap-2">
          <button
            className="inline-flex justify-center gap-1 rounded-md font-semibold text-black underline hover:text-black-hover lg:rounded-lg"
            onClick={() => handleDelete()}
          >
            {isConfirming ? 'Confirm delete' : 'Delete venue'}
          </button>

          <SecondaryButton size="default" onClick={() => setIsEditOpen(true)}>
            Edit venue
          </SecondaryButton>
        </div>
      </div>

      <Modal isModalOpen={isBookingsOpen} setIsModalOpen={setIsBookingsOpen}>
        <BookingsList bookings={venue.bookings!} />
      </Modal>

      <Modal
        isModalOpen={isEditOpen}
        setIsModalOpen={setIsEditOpen}
        modalFooter={<ManageFooter setIsModalOpen={setIsEditOpen} />}
      >
        <ManageForm venue={venue} setIsModalOpen={setIsEditOpen} />
      </Modal>
    </div>
  )
}
