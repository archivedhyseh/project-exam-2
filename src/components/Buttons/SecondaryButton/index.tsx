import { ButtonHTMLAttributes, ReactNode } from 'react'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
  size: 'default' | 'full'
}

export default function SecondaryButton({
  children,
  size,
  ...props
}: SecondaryButtonProps) {
  switch (size) {
    case 'default':
      return (
        <button
          className="inline-flex justify-center gap-2 rounded-full bg-black px-3 py-2 font-bold text-white hover:bg-black-hover lg:px-5 lg:py-3"
          {...props}
        >
          {children}
        </button>
      )

    case 'full':
      return (
        <button
          className="inline-flex w-full justify-center gap-2 rounded-full bg-black px-3 py-2 font-bold text-white hover:bg-black-hover lg:px-5 lg:py-3"
          {...props}
        >
          {children}
        </button>
      )
  }
}
