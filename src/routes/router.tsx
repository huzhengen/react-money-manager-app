import type { AxiosError } from 'axios'
import axios from 'axios'
import { createBrowserRouter } from 'react-router-dom'
import { preload } from 'swr'
import { Root } from '../components/Root'
import { ErrorEmptyData, ErrorUnauthorized } from '../errors'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { Home } from '../pages/Home'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { ItemsPage } from '../pages/ItemsPage'
import { ItemsPageError } from '../pages/ItemsPageError'
import { SignInPage } from '../pages/SignInPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'

export const router = createBrowserRouter([
  { path: '/', element: <Root />, },
  { path: '/home', element: <Home title="Home" /> },
  {
    path: '/welcome',
    element: <WelcomeLayout />,
    children: [
      { path: '1', element: <Welcome1 /> },
      { path: '2', element: <Welcome2 /> },
      { path: '3', element: <Welcome3 /> },
      { path: '4', element: <Welcome4 /> },
    ]
  },
  {
    path: '/items',
    element: <ItemsPage />,
    errorElement: <ItemsPageError />,
    loader: async () => {
      return preload('/api/v1/items?page=1', async () => {
        const onError = (error: AxiosError) => {
          if (error.response?.status === 401) { throw new ErrorUnauthorized() }
          throw error
        }
        const response = await axios.get<Resources<Item>>('/api/v1/items?page=1').catch(onError)
        if (response.data.resources.length > 0) {
          return response.data
        } else {
          throw new ErrorEmptyData()
        }
      })
    }
  },
  { path: '/items/new', element: <ItemsNewPage /> },
  { path: '/sign_in', element: <SignInPage /> },
  { path: '/statistics', element: <StatisticsPage /> },
  { path: '/export', element: <div>Under Construction</div> },
  { path: '/tags', element: <div>Tags</div> },
  { path: '/tags/new', element: <TagsNewPage /> },
  { path: '/tags/:id', element: <TagsEditPage /> },
  { path: '/noty', element: <div>Under Construction</div> },
])
