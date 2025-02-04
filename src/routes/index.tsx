import { AdminForgotPasswordPage } from '@/components/admin/forgot-password'
import { AdminLoginPage } from '@/components/admin/login'
import { AdminResetPasswordPage } from '@/components/admin/reset-password'
import { GenericError } from '@/components/errors/generic'
import { Admin } from '@/pages/admin'
import { Appointment } from '@/pages/appointment'
import { RegisterCompany } from '@/pages/company/register'
import { SuccessCompanyPage } from '@/pages/company/register-success'
import { Dashboard } from '@/pages/dashboard'
import { DashboardAppointments } from '@/pages/dashboard/appointments'
import { CompanyDetails } from '@/pages/dashboard/company-details'
import { DashboardHours } from '@/pages/dashboard/hours'
import { DashboardRegisters } from '@/pages/dashboard/registers'
import { Home } from '@/pages/home'
import { createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from './guards/auth-guard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <GenericError />,
  },
  {
    path: '/appointment',
    element: <Appointment />,
    errorElement: <GenericError />,
  },
  {
    path: '/company/register',
    element: <RegisterCompany />,
    errorElement: <GenericError />,
  },
  {
    path: '/company/register/success',
    element: <SuccessCompanyPage />,
    errorElement: <GenericError />,
  },
  {
    path: '/',
    element: <Admin />,
    errorElement: <GenericError />,
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
    errorElement: <GenericError />,
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
        path: '/admin/dashboard/hours',
        element: <DashboardHours />,
      },
      {
        path: '/admin/dashboard/profile',
        element: <CompanyDetails />,
      },
    ],
  },
])
