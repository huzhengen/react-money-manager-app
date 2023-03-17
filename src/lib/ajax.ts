import type { AxiosError } from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoadingStore } from '../stores/useLoadingStore'

axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:3000/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

axios.interceptors.request.use((config) => {
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

  const ajax = {
    get: <T>(path: string) => {
      if (showLoading) { setVisible(true) }
      return axios.get<T>(path).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return axios.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return axios.patch<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    destroy: <T>(path: string) => {
      if (showLoading) { setVisible(true) }
      return axios.delete<T>(path).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
  }
  return ajax
}
