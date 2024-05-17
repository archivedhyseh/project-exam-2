import { InputHTMLAttributes } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormValues } from '..'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
}: InputProps) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className="font-semibold text-text">
        {label}
      </label>

      <input
        id={id}
        {...register(id)}
        {...props}
        className="rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
      />

      {errors[id] && <span className="text-text">{errors[id]?.message}</span>}
    </div>
  )
}
