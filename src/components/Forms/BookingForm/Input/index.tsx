import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <label htmlFor={id} className="font-semibold text-text">
        {label}
      </label>

      <input
        id={id}
        {...props}
        className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted lg:rounded-lg lg:px-5 lg:py-3"
      />
    </div>
  )
}
