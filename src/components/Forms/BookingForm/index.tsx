import { useMutation } from '@tanstack/react-query'
import { parseISO } from 'date-fns'
import { FormEvent } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import LoginForm from '../../../components/Forms/LoginForm'
import SignupForm from '../../../components/Forms/SignupForm'
import PrimaryButton from '../../../components/Buttons/PrimaryButton'
import Tabs from '../../../components/Tabs'
import Input from './Input'

type FormData = {
  dateFrom: Date
  dateTo: Date
  guests: number
  venueId: string
}

const fetchBooking = async (body: FormData) => {
  const accessToken = localStorage.getItem('accessToken')

  const res = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': 'b16636bb-a3d8-463c-b6c4-e230abe1b53d',
    },
    body: JSON.stringify(body),
  })

  const { data, errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data
}

export default function BookingForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { id } = useParams()
  const accessToken = localStorage.getItem('accessToken')

  const tabsData = [
    { label: 'Log in', element: <LoginForm /> },
    { label: 'Sign up', element: <SignupForm /> },
  ]

  const { mutate, error, isError } = useMutation({
    mutationFn: fetchBooking,
    onSuccess: () => {
      navigate('/dashboard', { replace: true })
    },
  })

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const body: FormData = {
      dateFrom: parseISO(searchParams.get('checkin')!),
      dateTo: parseISO(searchParams.get('checkout')!),
      guests: parseFloat(searchParams.get('guests')!),
      venueId: id!,
    }

    mutate(body)
  }

  return (
    <>
      {accessToken ? (
        <>
          <form
            className="grid gap-4"
            id="bookingForm"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <div className="grid gap-8">
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold text-text">
                  Personal information
                </h2>

                <div className="flex flex-row gap-4">
                  <Input
                    type="text"
                    placeholder="First name"
                    id="firstName"
                    label="First name"
                  />

                  <Input
                    type="text"
                    placeholder="Last name"
                    id="lastName"
                    label="Last name"
                  />
                </div>

                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  label="Email"
                />
              </div>

              <div className="grid gap-4">
                <h2 className="text-xl font-semibold text-text">
                  Payment details
                </h2>

                <Input
                  type="number"
                  placeholder="1234 1234 1234 1234"
                  id="cardNumber"
                  label="Card number"
                />

                <div className="flex flex-row gap-4">
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    id="cardExpiration"
                    label="Expiration"
                  />

                  <Input
                    type="number"
                    placeholder="CVC"
                    id="cardVerification"
                    label="CVC"
                  />
                </div>
              </div>
            </div>

            <PrimaryButton size="full" form="bookingForm" type="submit">
              Confirm booking
            </PrimaryButton>

            {isError && (
              <div>
                <span>{error.message}</span>
              </div>
            )}
          </form>
        </>
      ) : (
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold text-text">
            Log in or sign up to book
          </h2>

          <Tabs tabsData={tabsData} />
        </div>
      )}
    </>
  )
}
