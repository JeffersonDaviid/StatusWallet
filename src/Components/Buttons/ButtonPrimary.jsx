import React from 'react'
import { Link } from 'react-router-dom'

import './buttons.css'

const ButtonPrimary = ({ to, ...props }) => {
  return (
    <button
      className='btn btn-primary'
      {...props}
    >
      {to !== 'anyWhere' ? (
        <Link to={`${to}`}>
          <strong>{props.values}</strong>
        </Link>
      ) : (
        <strong>{props.values}</strong>
      )}
    </button>
  )
}

export default ButtonPrimary
