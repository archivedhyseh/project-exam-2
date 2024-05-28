import { Outlet, ScrollRestoration } from 'react-router-dom'
import Layout from './layout'

export default function App() {
  return (
    <Layout>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname
        }}
      />
      <Outlet />
    </Layout>
  )
}
