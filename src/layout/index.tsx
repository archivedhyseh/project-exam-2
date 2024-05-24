import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

type LayoutProps = { children: ReactNode }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mb-5 flex-1 lg:mb-4">{children}</main>
      <Footer />
    </>
  )
}
