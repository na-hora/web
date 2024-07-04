import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './routes'

import '@fontsource/rubik'
import { RouterProvider } from 'react-router-dom'
import { GlobalAlert } from './components/global-alert'
import { ApplicationProvider } from './contexts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApplicationProvider>
      <RouterProvider router={router} />
      <GlobalAlert />
    </ApplicationProvider>
  </React.StrictMode>,
)
