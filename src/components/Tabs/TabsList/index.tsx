import { ReactNode } from 'react'

type TabsListProps = {
  children: ReactNode
}

export default function TabsList({ children }: TabsListProps) {
  return (
    <div className="overflow-hidden overflow-x-auto p-1">
      <div className="flex">{children}</div>

      <hr className="border-black-alt" />
    </div>
  )
}
