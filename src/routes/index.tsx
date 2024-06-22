import { RegisterCompany } from "@/pages/company/register";
import { Dashboard } from "@/pages/dashboard";
import { Home } from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/company/register",
    element: <RegisterCompany />,
  },
  {
    path: "/appointment",
    element: <div>Appointment</div>,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "home",
        element: <div>Home</div>,
      },
      {
        path: "settings",
        element: <div>Settings</div>,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
]);
