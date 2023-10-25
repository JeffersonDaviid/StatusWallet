import React from 'react'
import { Link } from 'react-router-dom'

import './buttons.css'

const ButtonLinkSecondary = ({ to, label, action }) => {
  return (
    <Link
      to={`/${to}`}
      className='btn btn-secondary'
      onClick={action}
    >
      <b>{label}</b>
    </Link>
  )
}

export default ButtonLinkSecondary
