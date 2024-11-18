import { AdminForgotPasswordPage } from '@/components/admin/forgot-password'
import { AdminLoginPage } from '@/components/admin/login'
import { AdminResetPasswordPage } from '@/components/admin/reset-password'
import { Admin } from '@/pages/admin'
import { RegisterCompany } from '@/pages/company/register'
import { SuccessCompanyPage } from '@/pages/company/register-success'
import { Dashboard } from '@/pages/dashboard'
import { DashboardAppointments } from '@/pages/dashboard/appointments'
import { DashboardRegisters } from '@/pages/dashboard/registers'
import { NotFoundPage } from '@/pages/errors/not-found'
import { Home } from '@/pages/home'
import { createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from './guards/auth-guard'

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
  {
    path: '/admin/dashboard',
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
    children: [
      {
        path: '/admin/dashboard/appointments',
        element: <DashboardAppointments />,
      },
      {
        path: '/admin/dashboard/registers',
        element: <DashboardRegisters />,
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
