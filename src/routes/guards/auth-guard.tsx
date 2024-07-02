import { parseCookies } from 'nookies'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  // Check if the auth_token cookie is present
  const authToken = parseCookies()['access-token@na-hora']

  // If not present, redirect to the login page
  if (!authToken) {
    return <Navigate to='/admin/login' replace />
  }

  // Otherwise, render the children components
  return children
}
