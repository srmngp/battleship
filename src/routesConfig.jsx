import React from 'react'
import App from './App'
import { Home } from './pages/Home'
import { Lobby } from './pages/Lobby'
import { Join } from './pages/Join'
import ErrorPage from './pages/Error'
import Game from './pages/Game'
import ContextProvider from './components/ContextProvider'

const routesConfig = [{
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
      element: <ContextProvider><Join /></ContextProvider>
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
}]

export default routesConfig
