import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Landing from "./components/Landing.tsx";
import { Dashboard } from './components/Dashboard.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {DashboardLoader} from "./loaders.ts";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,

    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      loader: DashboardLoader,
    },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
  </React.StrictMode>,

)
