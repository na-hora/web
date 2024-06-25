import axios, { InternalAxiosRequestConfig } from 'axios'
import { parseCookies } from 'nookies'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Expose-Headers': 'Authorization',
  },
})

axiosInstance.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig<unknown>,
  ): InternalAxiosRequestConfig<unknown> => {
    const isLoginRoute = config.url?.endsWith('login')

    if (!isLoginRoute) return config

    const accessToken = parseCookies()['access-token@na-hora']

    if (accessToken) {
      config.headers!['Authorization'] = `Bearer ${accessToken}`
    }
    console.log('config: ', config)
    return config
  },
)

export default axiosInstance
