import { useRouteError } from 'react-router-dom'

export default function ErrorPage () {
  const error = useRouteError()
  console.error(error) // TODO dejar esto?

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Apologies, it appears we have encountered an unforeseen technical issue that requires immediate attention.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
