import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

type Layout = { children: ReactNode }

export default function Layout({ children }: Layout) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
