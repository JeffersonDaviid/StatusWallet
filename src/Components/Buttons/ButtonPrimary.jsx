import React from 'react'
import { Link } from 'react-router-dom'

import './buttons.css'

const ButtonPrimary = ({ to, ...props }) => {
  return (
    <button
      className='btn btn-primary'
      {...props}
    >
      {to !== '' ? (
        <Link to={`/${to}`}>
          <b>{props.values}</b>
        </Link>
      ) : (
        <b>{props.values}</b>
      )}
    </button>
  )
}

export default ButtonPrimary
