import { AdminLoginPage } from '@/pages/admin/login'
import { RegisterCompany } from '@/pages/company/register'
import { SuccessCompanyPage } from '@/pages/company/register-success'
import { Dashboard } from '@/pages/dashboard'
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
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/admin/dashboard/home',
        element: <div>Home</div>,
      },
      {
        path: '/admin/dashboard/company',
        element: <div>Company</div>,
      },
      {
        path: '/admin/dashboard/profile',
        element: <div>Profile</div>,
      },
    ],
  },
])
