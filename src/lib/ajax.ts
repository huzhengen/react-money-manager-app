import type { AxiosError } from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoadingStore } from '../stores/useLoadingStore'

export const ajax = axios.create({
  baseURL: isDev ? '/' : 'https://mangosteen2.hunger-valley.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

ajax.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  const jwt = localStorage.getItem('jwt') || ''
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }
  return config
}, () => { })

type Options = {
  showLoading?: boolean
  handleError?: boolean
}

export const useAjax = (options?: Options) => {
  const nav = useNavigate()
  const table: Record<string, undefined | (() => void)> = {
    401: () => nav('/sign_in'),
    402: () => window.alert('Payment Required'),
    403: () => window.alert('Forbidden'),
    // 404: () => window.alert('Not Found'),
  }
  const showLoading = options?.showLoading || false
  const handleError = options?.handleError ?? true
  const { setVisible } = useLoadingStore()
  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = table[status]
        fn?.()
      }
    }
    throw error
  }

  return {
    get: <T>(path: string) => {
      if (showLoading) { setVisible(true) }
      return ajax.get<T>(path).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return ajax.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return ajax.patch<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    destroy: <T>(path: string) => {
      if (showLoading) { setVisible(true) }
      return ajax.delete<T>(path).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
  }
}
