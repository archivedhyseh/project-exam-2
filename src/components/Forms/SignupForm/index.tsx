import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ZodType, z } from 'zod'
import Input from './Input'
import PrimaryButton from '../../Buttons/PrimaryButton'

export type FormValues = {
  name: string
  email: string
  password: string
  venueManager?: boolean
}

const schema: ZodType<FormValues> = z.object({
  name: z
    .string()
    .min(6, { message: 'Username must be 6 or more characters long.' })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: 'Username can only contain letters, numbers, and underscores.',
    }),
  email: z.string().regex(/^[a-zA-Z0-9._-]+@stud\.noroff\.no$/, {
    message: 'Only @stud.noroff.no emails are allowed to sign up.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 or more characters long.' }),
  venueManager: z.boolean().default(true),
})

const fetchRegister = async (body: FormValues) => {
  const res = await fetch('https://v2.api.noroff.dev/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const { errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
}

export default function SignupForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const { mutate, error, isError } = useMutation({
    mutationFn: fetchRegister,
    onSuccess: () => {
      navigate('/login', { replace: true })
    },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data)
  }

  return (
    <form
      id="signupForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Input
        type="text"
        placeholder="Username"
        id="name"
        label="Username"
        register={register}
        errors={errors}
      />

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

      <PrimaryButton size="full" form="signupForm" type="submit">
        Sign up
      </PrimaryButton>

      {isError && (
        <div>
          <span>{error.message}.</span>
        </div>
      )}
    </form>
  )
}
