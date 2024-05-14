type TabsButtonProps = {
  label: string
  index: number
  tabsIndex: number
  setTabsIndex: (value: number) => void
}

export default function TabsButton({
  label,
  index,
  tabsIndex,
  setTabsIndex,
}: TabsButtonProps) {
  return (
    <button
      className={
        tabsIndex === index
          ? 'inline-flex justify-center gap-1 whitespace-nowrap rounded-t-md border-b-2 border-black px-3 py-2 font-bold text-text lg:rounded-t-lg lg:px-5 lg:py-3'
          : 'inline-flex justify-center gap-1 whitespace-nowrap rounded-t-md px-3 py-2 text-text-muted hover:text-text lg:rounded-t-lg lg:px-5 lg:py-3'
      }
      onClick={() => setTabsIndex(index)}
    >
      <span>{label}</span>
    </button>
  )
}
