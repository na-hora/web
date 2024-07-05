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

    if (!isLoginRoute) return config

    const accessToken = parseCookies()['access-token@na-hora']

    if (accessToken) {
      config.headers!['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
)

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const unauthorizedRoute = error.response.status === 401
//     const isLoginPage = window.location.pathname === ROUTES.PAGES.LOGIN

//     if (unauthorizedRoute) {
//       destroyCookie(null, 'access-token@na-hora')
//       window.location.href = '/admin/login'
//     }

//     return Promise.reject(error)
//   },
// )

export default axiosInstance
