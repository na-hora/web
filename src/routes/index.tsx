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
    path: '/company/register',
    element: <RegisterCompany />,
  },
  {
    path: '/company/register/success',
    element: <SuccessCompanyPage />,
  },
  {
    path: '/appointment',
    element: <div>Appointment</div>,
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
])
