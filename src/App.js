import './App.scss'
import ThemeProvider from './theme'
import Rfc from './pages/Rfc'
import SideNav from './components/SideNav'
import { Routes, Route, Outlet } from 'react-router-dom'
import Partners from './pages/Partners'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <ThemeProvider>
      {/* <Header /> */}
      <div className='App'>
        <SideNav />
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
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
