import { ReactNode } from 'react'

type TabsListProps = {
  children: ReactNode
}

export default function TabsList({ children }: TabsListProps) {
  return (
    <div>
      <div className="flex overflow-hidden overflow-x-auto">{children}</div>

      <hr className="border-black-alt" />
    </div>
  )
}
