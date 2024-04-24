import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/globals.css'
import App from './App.tsx'
import Root from './routes/Root/index.tsx'
import Venues from './routes/Venues/index.tsx'
import Signup from './routes/Signup/index.tsx'
import Login from './routes/Login/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
)
