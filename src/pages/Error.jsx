import { useRouteError } from 'react-router-dom'
import { Header } from '../components/Header'

export default function ErrorPage () {
  const error = useRouteError()
  console.error(error)

  return (
    <div id='error-page'>
      <div className='App magicpattern'>
        <Header />
        <h1>Oops!</h1>
        <p>Apologies, it appears we have encountered an unforeseen technical issue that requires immediate attention.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}
