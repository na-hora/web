import { parseCookies } from 'nookies'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const authToken = parseCookies()['access-token@na-hora']

  if (!authToken) {
    return <Navigate to='/admin/login' replace />
  }

  return children
}
