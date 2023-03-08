import axios from 'axios'
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

export const ajax = {
  get: <T>(path: string) => {
    return axios.get<T>(path)
  },
  post: <T>(path: string, data: JSONValue) => {
    return axios.post<T>(path, data)
  },
  patch: () => { },
  delete: () => { },
}

type Options = {
  showLoading?: boolean
}

export const useAjax = (options?: Options) => {
  const showLoading = options?.showLoading || false
  const { setVisible } = useLoadingStore()
  const ajax = {
    get: <T>(path: string) => {
      return axios.get<T>(path)
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return axios.post<T>(path, data).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: () => { },
    delete: () => { },
  }
  return ajax
}
