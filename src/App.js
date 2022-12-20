import './App.scss'
import ThemeProvider from './theme'
import Rfc from './pages/Rfc'
import SideNav from './components/SideNav'
import { Routes, Route, Outlet } from 'react-router-dom'
import Partners from './pages/Partners'
import Header from './components/Header'

const App = () => {
  return (
    <ThemeProvider>
      {/* <Header /> */}
      <div className='App'>
        <SideNav />
        <main>
          <Routes>
            <Route path='/' element={<Rfc />} />
            <Route path='/partners' element={<Partners />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
