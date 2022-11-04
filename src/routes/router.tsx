import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { welcomeRoutes } from './welcomeRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      welcomeRoutes
    ],
  },
])
