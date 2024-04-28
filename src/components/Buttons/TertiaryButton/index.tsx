import { ButtonHTMLAttributes, ReactNode } from 'react'

interface TertiaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
  size: 'default' | 'full'
}

export default function TertiaryButton({
  children,
  size,
  ...props
}: TertiaryButtonProps) {
  switch (size) {
    case 'default':
      return (
        <button
          className="inline-flex justify-center gap-1 rounded-full border border-black-alt bg-background px-3 py-2 text-text hover:bg-background-alt lg:px-5 lg:py-3"
          {...props}
        >
          {children}
        </button>
      )

    case 'full':
      return (
        <button
          className="inline-flex w-full justify-center gap-1 rounded-full border border-black-alt bg-background px-3 py-2 text-text hover:bg-background-alt lg:px-5 lg:py-3"
          {...props}
        >
          {children}
        </button>
      )
  }
}
