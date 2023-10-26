import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TransactionContextProvider } from './Context/TransactionContext.jsx'
import { UserAuthContextProvider } from './Context/UserAuthContext.jsx'

import './index.css'
import { AlertContextProvider } from './Context/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertContextProvider>
      <UserAuthContextProvider>
        <TransactionContextProvider>
          <App />
        </TransactionContextProvider>
      </UserAuthContextProvider>
    </AlertContextProvider>
  </React.StrictMode>
)
