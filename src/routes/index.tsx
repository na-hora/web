import { AdminLoginPage } from '@/pages/admin/login'
import { RegisterCompany } from '@/pages/company/register'
import { SuccessCompanyPage } from '@/pages/company/register-success'
import { Dashboard } from '@/pages/dashboard'
import { Home } from '@/pages/home'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/appointment',
    element: <div>Appointment</div>,
  },
  {
    path: '/company',
    children: [
      {
        path: 'register',
        element: <RegisterCompany />,
        children: [
          {
            path: 'success',
            element: <SuccessCompanyPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <AdminLoginPage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'home',
            element: <div>Home</div>,
          },
          {
            path: 'company',
            element: <div>Company</div>,
          },
          {
            path: 'profile',
            element: <div>Profile</div>,
          },
        ],
      },
    ],
  },
])
