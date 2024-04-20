import { ButtonHTMLAttributes, ReactNode } from 'react'

interface SecondaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
}

export default function SecondaryButton({
  children,
  ...props
}: SecondaryButton) {
  return (
    <button
      className="text-white inline-flex rounded-full bg-black px-3 py-2 font-bold md:px-5 md:py-3"
      {...props}
    >
      {children}
    </button>
  )
}
