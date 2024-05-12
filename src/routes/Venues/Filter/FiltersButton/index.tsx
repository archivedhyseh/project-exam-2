type FiltersButtonProps = {
  setIsModalOpen: (value: boolean) => void
}

export default function FiltersButton({ setIsModalOpen }: FiltersButtonProps) {
  return (
    <button
      className="inline-flex min-w-[50px] items-center justify-center gap-2 rounded-full bg-black p-3 font-bold text-white hover:bg-black-hover sm:min-w-[auto] lg:px-5 lg:py-3"
      onClick={() => setIsModalOpen(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
      <span className="sr-only sm:not-sr-only">Filters</span>
    </button>
  )
}
