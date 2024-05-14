import { ReactNode, useState } from 'react'
import TabsList from './TabsList'
import TabsPanel from './TabsPanel'
import TabsButton from './TabsButton'

type TabsProps = {
  tabsData: { label: string; element: ReactNode }[]
}

export default function Tabs({ tabsData }: TabsProps) {
  const [tabsIndex, setTabsIndex] = useState<number>(0)

  return (
    <>
      <TabsList>
        {tabsData.map((tab, index) => (
          <TabsButton
            key={index}
            label={tab.label}
            index={index}
            tabsIndex={tabsIndex}
            setTabsIndex={setTabsIndex}
          />
        ))}
      </TabsList>

      <TabsPanel tabsData={tabsData} tabsIndex={tabsIndex} />
    </>
  )
}
