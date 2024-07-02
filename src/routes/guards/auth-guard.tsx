import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  // Function to get the cookie by name
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    if (match) return match[2]
    return null
  }

  // Check if the auth_token cookie is present
  const authToken = getCookie('access-token@na-hora')

  // If not present, redirect to the login page
  if (!authToken) {
    return <Navigate to='/admin/login' replace />
  }

  // Otherwise, render the children components
  return children
}

export default RouteGuard
