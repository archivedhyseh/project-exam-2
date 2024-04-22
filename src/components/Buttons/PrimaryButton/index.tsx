import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
  size: 'default' | 'full'
}

export default function PrimaryButton({
  children,
  size,
  ...props
}: PrimaryButton) {
  switch (size) {
    case 'default':
      return (
        <button
          className="inline-flex justify-center gap-2 rounded-full bg-brand px-3 py-2 font-bold text-white hover:bg-brand-hover md:px-5 md:py-3"
          {...props}
        >
          {children}
        </button>
      )

    case 'full':
      return (
        <button
          className="inline-flex w-full justify-center gap-2 rounded-full bg-brand px-3 py-2 font-bold text-white hover:bg-brand-hover md:px-5 md:py-3"
          {...props}
        >
          {children}
        </button>
      )
  }
}
