import { InputHTMLAttributes } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormValues } from '..'

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  id: keyof FormValues
  label: string
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

export default function Input({
  id,
  label,
  register,
  errors,
  ...props
}: Input) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-text">
        {label}
      </label>
      <input
        {...props}
        {...register(id)}
        id={id}
        className="rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted md:rounded-lg md:px-5 md:py-3"
      />
      {errors[id] && <span>{errors[id]?.message}</span>}
    </div>
  )
}
