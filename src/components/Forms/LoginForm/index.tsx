import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import Input from './Input'
import PrimaryButton from '../../Buttons/PrimaryButton'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

export type FormValues = {
  email: string
  password: string
}

const schema: ZodType<FormValues> = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
})

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const { mutate, error, isError } = useMutation({
    mutationFn: async (body: FormValues) => {
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

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('name', data.name)
    },
  })

  function onSubmit(data: FormValues) {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Input
          type="email"
          label="Email"
          id="email"
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          label="Password"
          id="password"
          register={register}
          errors={errors}
        />
      </div>

      {isError && (
        <div>
          <span>{error.message}.</span>
        </div>
      )}

      <PrimaryButton size="full" onClick={() => onSubmit}>
        Log in
      </PrimaryButton>

      <span className="text-text">
        Don't have an account?{' '}
        <Link to="/signup" className="font-bold text-text">
          Sign up
        </Link>
      </span>
    </form>
  )
}
