import { ButtonHTMLAttributes, ReactNode } from 'react'

interface TertiaryButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
  size: 'default' | 'full'
}

export default function TertiaryButton({
  children,
  size,
  ...props
}: TertiaryButton) {
  switch (size) {
    case 'default':
      return (
        <button
          className="inline-flex justify-center gap-1 rounded-full bg-background px-3 py-2 text-text outline outline-1 outline-black-alt hover:bg-background-alt md:px-5 md:py-3"
          {...props}
        >
          {children}
        </button>
      )

    case 'full':
      return (
        <button
          className="inline-flex w-full justify-center gap-1 rounded-full bg-background px-3 py-2 text-text outline outline-1 outline-black-alt hover:bg-background-alt md:px-5 md:py-3"
          {...props}
        >
          {children}
        </button>
      )
  }
}
