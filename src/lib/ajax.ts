import axios from 'axios'
import { useContext } from 'react'
import { LoadingContext } from '../App'

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
  const { show, hide } = useContext(LoadingContext)
  const ajax = {
    get: <T>(path: string) => {
      return axios.get<T>(path)
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { show() }
      return axios.post<T>(path, data).finally(() => {
        if (showLoading) { hide() }
      })
    },
    patch: () => { },
    delete: () => { },
  }
  return ajax
}
