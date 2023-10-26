import { createContext, useContext, useState } from 'react'

const AlertContext = createContext()

export const useAlert = () => {
  const { showAlert, hideAlert, alert } = useContext(AlertContext)
  const typeAlerts = {
    error: 'error',
    warning: 'warning',
    info: 'info',
    success: 'success',
  }

  return {
    typeAlerts,
    showAlert,
    hideAlert,
    alert,
  }
}

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: '',
    visible: false,
    type: '',
  })

  const showAlert = (message, type) => {
    setAlert({ message, visible: true, type })

    // Ocultar la alerta después de 4 segundos
    setTimeout(() => {
      hideAlert()
    }, 7000)
  }

  const hideAlert = () => {
    setAlert({ message: '', visible: false })
  }

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
    </AlertContext.Provider>
  )
}
