import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import './App.css'

import NavBar from './Components/NavBar/NavBar'
import Home from './pages/Home'
import Configuration from './pages/Configuration'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import TransactionInput from './Components/TransactionInput/TransactionInput'

function App() {
  return (
    <HashRouter>
      <div className='container-app-global'>
        {/* <BrowserRouter> */}
        <NavBar />
        <Routes>
          {/* <Route
            path='/StatusWallet/'
            element={<NavBar />}
  />*/}
          <Route
            path='/'
            Component={Home}
          />
          <Route
            path='/reportes'
            Component={Reports}
          />
          <Route
            path='/configuracion'
            Component={Configuration}
          />
          <Route
            path='/perfil'
            Component={Profile}
          />
          <Route
            path='/transaccion'
            Component={TransactionInput}
          />
        </Routes>
        {/* </BrowserRouter> */}
      </div>
    </HashRouter>
  )
}

export default App
