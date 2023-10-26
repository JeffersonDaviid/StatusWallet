import React from 'react'
import { useEffect } from 'react'

import { Alert, AlertProps, Button } from '@mui/material'
import { useAlert } from '../../Context/AlertContext'

import './alertRight.css'

interface MyCustomAlertProps extends AlertProps {}

const AlertRight: React.FC<MyCustomAlertProps> = () => {
  const { alert, hideAlert } = useAlert()

  useEffect(() => {
    if (alert.visible) {
      const timeout = setTimeout(() => {
        hideAlert()
      }, 7000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [alert.visible, hideAlert])

  if (!alert.visible) {
    return null
  }

  return (
    <Alert
      severity={alert.type}
      className='alert animationDesapear'
      variant='filled'
    >
      <label>{alert.message}</label>
      <span
        aria-label='close'
        color='inherit'
        onClick={() => hideAlert()}
      >
        X
      </span>
    </Alert>
  )
}

export default AlertRight
