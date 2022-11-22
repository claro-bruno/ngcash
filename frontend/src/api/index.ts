import axios from 'axios'
import { getUserFromLocalStorage } from '../context/AuthProvider/utils'

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_ROUTE,
})

Api.interceptors.request.use(
  (config: any) => {
    const user = getUserFromLocalStorage()
    if (user) {
      config.headers.Authorization = user?.token
      return config
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
