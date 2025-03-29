import { AdminForgotPasswordPage } from '@/components/admin/forgot-password'
import { AdminLoginPage } from '@/components/admin/login'
import { AdminResetPasswordPage } from '@/components/admin/reset-password'
import { GenericError } from '@/components/errors/generic'
import { Admin } from '@/pages/admin'
import { Appointment } from '@/pages/appointment'
import { RegisterCompany } from '@/pages/company/register'
import { SuccessCompanyPage } from '@/pages/company/register-success'
import { AppointmentConfirmation } from '@/pages/confirmation'
import { Dashboard } from '@/pages/dashboard'
import { DashboardAppointments } from '@/pages/dashboard/appointments'
import { CompanyDetails } from '@/pages/dashboard/company-details'
import { DashboardHours } from '@/pages/dashboard/hours'
import { DashboardRegisters } from '@/pages/dashboard/registers'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from './guards/auth-guard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/admin/login' replace />,
  },
  {
    path: '/appointment',
    element: <Appointment />,
    errorElement: <GenericError />,
  },
  {
    path: '/appointment/confirmation',
    element: <AppointmentConfirmation />,
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
    path: '/admin',
    element: <Admin />,
    errorElement: <GenericError />,
    children: [
      {
        path: 'login',
        element: <AdminLoginPage />,
      },
      {
        path: 'forgot-password',
        element: <AdminForgotPasswordPage />,
      },
      {
        path: 'reset-password',
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
        path: 'appointments',
        element: <DashboardAppointments />,
      },
      {
        path: 'registers',
        element: <DashboardRegisters />,
      },
      {
        path: 'hours',
        element: <DashboardHours />,
      },
      {
        path: 'profile',
        element: <CompanyDetails />,
      },
    ],
  },
])
