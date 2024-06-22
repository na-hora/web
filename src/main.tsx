import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { router } from "./routes"

import "@fontsource/rubik"
import { RouterProvider } from "react-router-dom"
import { ApplicationProvider } from "./providers"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApplicationProvider>
      <RouterProvider router={router} />
    </ApplicationProvider>
  </React.StrictMode>
)
