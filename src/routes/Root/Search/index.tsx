import { FormEvent, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Search() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState<string | undefined>('')

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchQuery) {
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase().replace(/\s+/g, ' ')

        searchParams.set('query', query)
        navigate('/venues' + `?query=${searchParams.get('query')}`)
      }
    }
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-black-alt px-3 py-3 pr-[50px] text-text placeholder:text-text-muted sm:pr-[108px] lg:px-5 lg:py-4 lg:pr-[116px]"
        />

        <div className="absolute right-0 p-1.5">
          <button className="inline-flex justify-center gap-1 rounded-full bg-brand p-2 font-bold text-white hover:bg-brand-hover lg:p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span className="sr-only sm:not-sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}
