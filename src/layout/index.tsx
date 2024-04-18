import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

type layout = { children: ReactNode }

export default function Layout({ children }: layout) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
