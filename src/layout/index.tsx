import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

type LayoutProps = { children: ReactNode }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-[calc(100dvh-82px-20px)] lg:mb-4 lg:min-h-[calc(100dvh-82px-16px)]">
        {children}
      </main>
      <Footer />
    </>
  )
}
