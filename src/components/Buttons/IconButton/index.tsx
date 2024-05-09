import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string
}

export default function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button
      className="inline-flex justify-center gap-2 rounded-full bg-background-body p-2 text-text hover:bg-background-alt disabled:text-text-muted/50 disabled:hover:bg-background-body lg:p-3"
      {...props}
    >
      {children}
    </button>
  )
}
