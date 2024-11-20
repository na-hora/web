import axios, { InternalAxiosRequestConfig } from 'axios'
import { parseCookies } from 'nookies'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig<unknown>,
  ): InternalAxiosRequestConfig<unknown> => {
    const isLoginRoute = config.url?.endsWith('login')

    if (isLoginRoute) return config

    const accessToken = parseCookies()['access-token@na-hora']

    if (accessToken) {
      config.headers!['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
)

export default axiosInstance
