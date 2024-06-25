import { AdminForgotPasswordPage } from '@/components/admin/forgot-password'
import { AdminLoginPage } from '@/components/admin/login'
import { AdminResetPasswordPage } from '@/components/admin/reset-password'
import { Admin } from '@/pages/admin'
import { RegisterCompany } from '@/pages/company/register'
import { SuccessCompanyPage } from '@/pages/company/register-success'
import { NotFoundPage } from '@/pages/errors/not-found'
import { Home } from '@/pages/home'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/appointment',
    element: <div>Appointment</div>,
  },
  {
    path: '/company/register',
    element: <RegisterCompany />,
  },
  {
    path: '/company/register/success',
    element: <SuccessCompanyPage />,
  },
  {
    path: '/',
    element: <Admin />,
    children: [
      {
        path: '/admin/login',
        element: <AdminLoginPage />,
      },
      {
        path: '/admin/forgot-password',
        element: <AdminForgotPasswordPage />,
      },
      {
        path: '/admin/reset-password',
        element: <AdminResetPasswordPage />,
      },
    ],
  },
  // {
  //   path: '/admin/dashboard',
  //   element: <Dashboard />,
  //   children: [
  //     {
  //       path: '/admin/dashboard/home',
  //       element: <div>Home</div>,
  //     },
  //     {
  //       path: '/admin/dashboard/company',
  //       element: <div>Company</div>,
  //     },
  //     {
  //       path: '/admin/dashboard/profile',
  //       element: <div>Profile</div>,
  //     },
  //   ],
  // },
])
