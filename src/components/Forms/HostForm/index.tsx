import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ZodType, z } from 'zod'
import { Errors, Venue } from '../../../api/types'
import Input from './Input'

export type FormValues = {
  media: { url: string; alt?: string }[]
  location: { city: string; country: string }
  name: string
  description: string
  maxGuests: number
  price: number
  meta: {
    wifi?: boolean
    parking?: boolean
    breakfast?: boolean
    pets?: boolean
  }
}

const schema: ZodType<FormValues> = z.object({
  media: z.array(
    z.object({
      url: z.string().url({ message: 'Please enter a valid url.' }),
      alt: z.string().default('').optional(),
    })
  ),
  location: z.object({
    city: z.string().min(1, { message: 'City is required.' }),
    country: z.string().min(1, { message: 'Country is required.' }),
  }),
  name: z
    .string()
    .min(6, { message: 'Name must be 6 or more characters long.' }),
  description: z
    .string()
    .min(20, { message: 'Description must be 20 or more characters long.' }),
  maxGuests: z.coerce
    .number()
    .min(1, { message: 'Max guests must be 1 or people.' })
    .max(10, { message: 'Max guests cannot exceed more than 10 people.' })
    .int({ message: 'Guests must be a whole number.' })
    .positive({ message: 'Guests must be a positive number.' }),
  price: z.coerce
    .number()
    .min(10, { message: 'Price must be at least €10 per night.' })
    .max(1000, { message: 'Price cannot exceed more than €1000 per night.' })
    .int({ message: 'Price must be a whole number.' })
    .positive({ message: 'Price must be a positive number.' }),
  meta: z.object({
    breakfast: z.boolean().default(false),
    parking: z.boolean().default(false),
    pets: z.boolean().default(false),
    wifi: z.boolean().default(false),
  }),
})

const fetchHost = async (body: FormValues) => {
  const accessToken = localStorage.getItem('accessToken')

  const res = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': 'b16636bb-a3d8-463c-b6c4-e230abe1b53d',
    },
    body: JSON.stringify(body),
  })

  const { data, errors }: { data: Venue; errors: Errors[] } = await res.json()

  if (errors) {
    throw new Error(errors[0].message)
  }

  return data
}

type HostFormProps = {
  setIsHostOpen: (value: boolean) => void
}

export default function HostForm({ setIsHostOpen }: HostFormProps) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      media: [{ url: '', alt: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'media',
  })

  const { mutate, error, isError } = useMutation({
    mutationFn: fetchHost,
    onSuccess: (data) => {
      navigate(`/venue/${data.id}`)
      setIsHostOpen(false)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data)
  }

  return (
    <form
      id="hostForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="grid gap-4">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="grid w-full gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <label
                  htmlFor={`media.${index}.url`}
                  className="font-semibold text-text"
                >
                  Media {index + 1}
                </label>

                <input
                  type="text"
                  placeholder="URL"
                  id={`media.${index}.url` as const}
                  {...register(`media.${index}.url` as const)}
                  className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
                />

                {errors?.media?.[index]?.url && (
                  <span className="text-text">
                    {errors.media[index]!.url!.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <label
                  htmlFor={`media.${index}.alt`}
                  className="font-semibold text-text"
                >
                  Media {index + 1} description
                </label>

                <input
                  type="text"
                  placeholder="Description"
                  id={`media.${index}.alt` as const}
                  {...register(`media.${index}.alt` as const)}
                  className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
                />
              </div>
            </div>
          )
        })}

        <div
          className={
            fields.length > 1
              ? 'flex flex-wrap items-center justify-between gap-2 whitespace-nowrap'
              : 'flex items-center justify-end gap-2'
          }
        >
          {fields.length > 1 && (
            <button
              className="inline-flex justify-center gap-1 rounded-md font-semibold text-black underline hover:text-black-hover lg:rounded-lg"
              type="button"
              onClick={() => remove(fields.length - 1)}
            >
              Remove field
            </button>
          )}

          {fields.length < 10 && (
            <button
              className="inline-flex justify-center gap-1 rounded-md font-semibold text-black underline hover:text-black-hover lg:rounded-lg"
              type="button"
              onClick={() => append({ url: '', alt: '' })}
            >
              <span>Add field</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <label htmlFor="location.city" className="font-semibold text-text">
            City
          </label>

          <input
            type="text"
            placeholder="City"
            id="location.city"
            {...register('location.city')}
            className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
          />

          {errors.location && errors.location.city && (
            <span className="text-text">{errors.location.city.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="location.country" className="font-semibold text-text">
            Country
          </label>

          <input
            type="text"
            placeholder="Country"
            id="location.country"
            {...register('location.country')}
            className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
          />

          {errors.location && errors.location.country && (
            <span className="text-text">{errors.location.country.message}</span>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        <Input
          type="text"
          placeholder="Name"
          id="name"
          label="Name"
          register={register}
          errors={errors}
        />

        <div className="flex flex-col gap-4">
          <label htmlFor="description" className="font-semibold text-text">
            Description
          </label>

          <textarea
            placeholder="Description"
            rows={6}
            id="description"
            {...register('description')}
            className="w-full resize-none rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
          ></textarea>

          {errors.description && (
            <span className="text-text">{errors.description.message}</span>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          type="number"
          placeholder="2"
          id="maxGuests"
          label="Max guests"
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          placeholder="50"
          id="price"
          label="Price per night in €EUR"
          register={register}
          errors={errors}
        />
      </div>

      <div className="grid gap-4">
        <span className="font-semibold text-text">Offers</span>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="relative flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="meta.breakfast"
              {...register('meta.breakfast')}
              className="peer h-8 w-8 appearance-none rounded-md border border-black-alt checked:bg-black hover:cursor-pointer lg:h-8 lg:w-8 lg:rounded-lg"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="pointer-events-none absolute hidden h-8 w-8 p-1 text-white peer-checked:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>

            <label htmlFor="meta.breakfast">Is breakfast included?</label>
          </div>

          <div className="relative flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="meta.parking"
              {...register('meta.parking')}
              className="peer h-8 w-8 appearance-none rounded-md border border-black-alt checked:bg-black hover:cursor-pointer lg:h-8 lg:w-8 lg:rounded-lg"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="pointer-events-none absolute hidden h-8 w-8 p-1 text-white peer-checked:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>

            <label htmlFor="meta.parking">Is parking allowed?</label>
          </div>

          <div className="relative flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="meta.pets"
              {...register('meta.pets')}
              className="peer h-8 w-8 appearance-none rounded-md border border-black-alt checked:bg-black hover:cursor-pointer lg:h-8 lg:w-8 lg:rounded-lg"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="pointer-events-none absolute hidden h-8 w-8 p-1 text-white peer-checked:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>

            <label htmlFor="meta.pets">Is pets allowed?</label>
          </div>

          <div className="relative flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="meta.wifi"
              {...register('meta.wifi')}
              className="peer h-8 w-8 appearance-none rounded-md border border-black-alt checked:bg-black hover:cursor-pointer lg:h-8 lg:w-8 lg:rounded-lg"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="pointer-events-none absolute hidden h-8 w-8 p-1 text-white peer-checked:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>

            <label htmlFor="meta.wifi">Is wifi included?</label>
          </div>
        </div>
      </div>

      {isError && (
        <div>
          <span className="text-text">{error.message}.</span>
        </div>
      )}
    </form>
  )
}
