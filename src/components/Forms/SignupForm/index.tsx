import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import Input from './Input'
import PrimaryButton from '../../Buttons/PrimaryButton'
import { Link } from 'react-router-dom'

export type FormValues = {
  username: string
  email: string
  password: string
}

const schema: ZodType<FormValues> = z.object({
  username: z
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
})

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  function onSubmit(data: FormValues) {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          label="Username"
          id="username"
          register={register}
          errors={errors}
        />
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

      <PrimaryButton size="full" onClick={() => onSubmit}>
        Sign up
      </PrimaryButton>

      <span className="text-text">
        Have an account?{' '}
        <Link to="/login" className="font-bold text-text">
          Log in
        </Link>
      </span>
    </form>
  )
}
