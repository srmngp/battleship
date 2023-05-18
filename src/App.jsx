import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'

function App () {
  return (
    <div className='App container magicpattern'>
      <Header />

      <div className='row h-75'>
        <div className='col-sm-1' />
        <div className='col'>
          <Outlet />
        </div>
        <div className='col-sm-1' />
      </div>

    </div>
  )
}

export default App
