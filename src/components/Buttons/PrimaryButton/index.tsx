import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
}

export default function PrimaryButton({ children, ...props }: PrimaryButton) {
  return (
    <button
      className="text-white inline-flex rounded-full bg-brand px-3 py-2 font-bold md:px-5 md:py-3"
      {...props}
    >
      {children}
    </button>
  )
}
