import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import NavBar from './Components/NavBar/NavBar'
import Home from './pages/Home'
import Configuration from './pages/Configuration'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import TransactionInput from './Components/TransactionInput/TransactionInput'

function App() {
  return (
    <div className='container-app-global'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/StatusWallet/'
            element={<NavBar />}
          >
            <Route
              path='/StatusWallet/'
              Component={Home}
            />
            <Route
              path='/StatusWallet/reportes'
              Component={Reports}
            />
            <Route
              path='/StatusWallet/configuracion'
              Component={Configuration}
            />
            <Route
              path='/StatusWallet/perfil'
              Component={Profile}
            />
            <Route
              path='/StatusWallet/transaccion'
              Component={TransactionInput}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
