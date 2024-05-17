import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ZodType, z } from 'zod'
import Input from './Input'
import PrimaryButton from '../../Buttons/PrimaryButton'

export type FormValues = {
  email: string
  password: string
}

const schema: ZodType<FormValues> = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
})

const fetchLogin = async (body: FormValues) => {
  const res = await fetch('https://v2.api.noroff.dev/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const { data, errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message)
  }

  if (data) {
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('name', data.name)
  }
}

export default function LoginForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const { mutate, error, isError } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      navigate('/venues', { replace: true })
    },
  })

  function onSubmit(data: FormValues) {
    mutate(data)
  }

  return (
    <form
      id="loginForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Input
        type="email"
        placeholder="Email"
        id="email"
        label="Email"
        register={register}
        errors={errors}
      />

      <Input
        type="password"
        placeholder="Password"
        id="password"
        label="Password"
        register={register}
        errors={errors}
      />

      <PrimaryButton size="full" form="loginForm" type="submit">
        Log in
      </PrimaryButton>

      {isError && (
        <div>
          <span>{error.message}.</span>
        </div>
      )}
    </form>
  )
}
