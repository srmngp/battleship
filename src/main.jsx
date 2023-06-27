import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { Lobby } from './pages/Lobby'
import { Join } from './pages/Join'
import ErrorPage from './pages/Error'
import Game from './pages/Game'
import ContextProvider from './components/ContextProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/join/:gameId',
        element: <Join />
      },
      {
        path: '/lobby/:gameId',
        element: <ContextProvider><Lobby /></ContextProvider>
      },
      {
        path: '/game/:gameId',
        element: <ContextProvider><Game /></ContextProvider>
      },
      {
        path: '*',
        element: <ErrorPage />
      }

    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
