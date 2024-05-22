import { useEffect, useState } from 'react'
import { Venue } from '../../../api/types'
import VenueImage from './VenueImage'
import VenueDetails from './VenueDetails'
import Modal from '../../Modal'
import ManageFooter from '../../Forms/ManageForm/ManageFooter'
import ManageForm from '../../Forms/ManageForm'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

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

type ManageCardProps = {
  venue: Venue
}

export default function ManageCard({ venue }: ManageCardProps) {
  const navigate = useNavigate()

  const [isConfirming, setIsConfirming] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    setIsConfirming(false)
  }, [])

  const { mutate } = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      navigate(`/venues`)
      setIsModalOpen(false)
    },
  })

  const handleDelete = () => {
    if (isConfirming) {
      mutate({ id: venue.id })
    } else {
      setIsConfirming(true)

      setTimeout(() => {
        setIsConfirming(false)
      }, 5000)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <VenueImage media={venue.media} name={venue.name} />
      <VenueDetails
        id={venue.id}
        name={venue.name}
        price={venue.price}
        location={venue.location}
      />

      <div className="flex items-center justify-between gap-2">
        <button
          className="inline-flex justify-center gap-1 rounded-md font-semibold text-black underline hover:text-black-hover lg:rounded-lg"
          form="searchForm"
          type="button"
          onClick={() => handleDelete()}
        >
          {isConfirming ? 'Confirm delete' : 'Delete'}
        </button>

        <button
          className="inline-flex justify-center gap-1 rounded-full bg-black px-3 py-2 font-bold text-white hover:bg-black-hover"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Manage
        </button>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalFooter={<ManageFooter setIsModalOpen={setIsModalOpen} />}
      >
        <ManageForm venue={venue} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  )
}
