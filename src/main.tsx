import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Landing from "./components/Landing.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RegistrationForm} from "./components/RegistrationForm.tsx";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
        children: [
            {
                path: '/registration',
                element: <RegistrationForm />,
            }
        ],
    },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
  </React.StrictMode>,

)
