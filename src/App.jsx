import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'

function App () {
  return (
    <div className='App container'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
