import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../src/components/Header'
import routesConfig from '../src/routesConfig'

describe('Header', () => {
  it('renders title', () => {
    render(<Header />)

    expect(screen.getByText('The Battleship'))
      .toBeInTheDocument()
  })
})

describe('Router', () => {
  it('renders home page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/']
    })

    render(<RouterProvider router={router} />)

    expect(router.state.location.pathname)
      .toBe('/')
  })

  it('renders game page when navigating to /game', () => {
    const router = createMemoryRouter(routesConfig, { initialEntries: ['/game'] })

    render(<RouterProvider router={router} />)

    expect(router.state.location.pathname)
      .toBe('/game')

  })

  it('renders lobby page when navigating to /lobby', () => {
    const router = createMemoryRouter(routesConfig, { initialEntries: ['/lobby'] })

    render(<RouterProvider router={router} />)

    expect(router.state.location.pathname)
      .toBe('/lobby')
  })

  it('renders join page when navigating to /join', () => {
    const router = createMemoryRouter(routesConfig, { initialEntries: ['/join'] })

    render(<RouterProvider router={router} />)

    expect(router.state.location.pathname)
      .toBe('/join')
  })

  it('renders error page when navigating to /error', () => {
    const router = createMemoryRouter(routesConfig, { initialEntries: ['/error'] })

    render(<RouterProvider router={router} />)

    expect(router.state.location.pathname)
      .toBe('/error')
  })

  it('renders error page when navigating to non exising page', () => {
    const router = createMemoryRouter(routesConfig, { initialEntries: ['/asdf'] })

    render(<RouterProvider router={router} />)

    expect(screen.getByText('Oops!'))
      .toBeInTheDocument()
  })

})
