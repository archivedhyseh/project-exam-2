import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/globals.css'
import './styles/daypicker.css'
import App from './App.tsx'
import Error from './routes/Error/index.tsx'
import Root from './routes/Root/index.tsx'
import Venues from './routes/Venues/index.tsx'
import Listing from './routes/Listing/index.tsx'
import Booking from './routes/Booking/index.tsx'
import Support from './routes/Support/index.tsx'
import Dashboard from './routes/Dashboard/index.tsx'
import Signup from './routes/Signup/index.tsx'
import Login from './routes/Login/index.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: '/venues',
        element: <Venues />,
      },
      {
        path: '/venue/:id',
        element: <Listing />,
      },
      {
        path: '/book/:id',
        element: <Booking />,
      },
      {
        path: '/support',
        element: <Support />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
