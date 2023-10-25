import React from 'react'
import { Link } from 'react-router-dom'

import './buttons.css'

const ButtonLinkPrimary = ({ to, label, action }) => {
  return (
    <Link
      to={`/${to}`}
      className='btn btn-primary'
      onClick={action}
    >
      <b>{label}</b>
    </Link>
  )
}

export default ButtonLinkPrimary
