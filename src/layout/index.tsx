import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

type LayoutProps = { children: ReactNode }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
