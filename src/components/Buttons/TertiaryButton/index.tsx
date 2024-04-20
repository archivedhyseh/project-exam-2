import { ButtonHTMLAttributes, ReactNode } from 'react'

interface TertiaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
}

export default function TertiaryButton({ children, ...props }: TertiaryButton) {
  return (
    <button
      className="inline-flex rounded-full px-3 py-2 font-medium text-text outline outline-1 outline-black-alt md:px-5 md:py-3"
      {...props}
    >
      {children}
    </button>
  )
}
