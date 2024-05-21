import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  labelTitle: string
  labelDescription: string
}

export default function Input({
  id,
  labelTitle,
  labelDescription,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className="flex flex-col">
        <span className="text-xl font-semibold text-text">{labelTitle}</span>
        <span className="text-text-muted">{labelDescription}</span>
      </label>
      <input
        {...props}
        id={id}
        className="w-full rounded-md border border-black-alt px-3 py-2 text-text placeholder:text-text-muted md:rounded-lg lg:px-5 lg:py-3"
      />
    </div>
  )
}
