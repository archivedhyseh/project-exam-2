import { Fragment, ReactNode } from 'react'

type TabsPanelProps = {
  tabsData: { label: string; element: ReactNode }[]
  tabsIndex: number
}

export default function TabsPanel({ tabsData, tabsIndex }: TabsPanelProps) {
  return (
    <>
      {tabsData.map(
        (tab, index) =>
          tabsIndex === index && <Fragment key={index}>{tab.element}</Fragment>
      )}
    </>
  )
}
