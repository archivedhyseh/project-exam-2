import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import { Profile } from '../../../api/types'

export type FormValues = {
  avatar: { url: string; alt?: string }
  bio?: string
}

const schema: ZodType<FormValues> = z.object({
  avatar: z.object({
    url: z.string().url({ message: 'Please enter a valid url.' }),
    alt: z.string().default('').optional(),
  }),
  bio: z.string(),
})

const fetchUpdate = async (body: FormValues) => {
  const accessToken = localStorage.getItem('accessToken')
  const username = localStorage.getItem('name')

  let url = 'https://v2.api.noroff.dev/holidaze/profiles' + `/${username}`

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': 'b16636bb-a3d8-463c-b6c4-e230abe1b53d',
    },
    body: JSON.stringify(body),
  })

  const { errors } = await res.json()

  if (errors) {
    throw new Error(errors[0].message)
  }
}

type ProfileFormProps = {
  profile: Profile
  setIsProfileOpen: (value: boolean) => void
}

export default function ProfileForm({
  profile,
  setIsProfileOpen,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      avatar: profile.avatar,
      bio: profile.bio,
    },
  })

  const { mutate, error, isError } = useMutation({
    mutationFn: fetchUpdate,
    onSuccess: () => {
      setIsProfileOpen(false)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data)
  }

  return (
    <form
      id="profileForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label htmlFor="avatar.url" className="font-semibold text-text">
            Avatar
          </label>

          <input
            type="text"
            placeholder="URL"
            id="avatar.url"
            {...register('avatar.url')}
            className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
          />

          {errors.avatar && errors.avatar.url && (
            <span className="text-text">{errors.avatar.url.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="avatar.alt" className="font-semibold text-text">
            Avatar description
          </label>

          <input
            type="text"
            placeholder="Description"
            id="avatar.alt"
            {...register('avatar.alt')}
            className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
          />

          {errors.avatar && errors.avatar.alt && (
            <span className="text-text">{errors.avatar.alt.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="bio" className="font-semibold text-text">
          Bio
        </label>

        <textarea
          placeholder="Bio"
          rows={6}
          id="bio"
          {...register('bio')}
          className="w-full resize-none rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
        ></textarea>

        {errors.bio && <span className="text-text">{errors.bio.message}</span>}
      </div>

      {isError && (
        <div>
          <span className="text-text">{error.message}.</span>
        </div>
      )}
    </form>
  )
}
