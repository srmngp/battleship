import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { Lobby } from './pages/Lobby'
import { JoinGame } from './pages/JoinGame'
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
        element: <JoinGame />
      },
      {
        path: '/lobby/:gameId',
        element: <ContextProvider><Lobby /></ContextProvider>
      },
      {
        path: '/game/:gameId',
        element: <ContextProvider><Game /></ContextProvider>
      }
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
