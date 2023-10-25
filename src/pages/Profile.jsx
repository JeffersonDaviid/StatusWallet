import { useState } from 'react'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import './profile.css'
import { Button } from '@mui/material'
import { FaXTwitter } from 'react-icons/fa6'

const Profile = () => {
  const [typeInputTextPassword, setTypeInputTextPassword] = useState('password')

  return (
    <div className='profileContainer'>
      <h2 className='logoAppContainer'>FINANZAS</h2>
      <div className='inputEmailPasswordContainer'>
        <input
          type='email'
          required
          placeholder='Yourmail@example.com'
          className='input-email'
        />

        <label className='inputPasswordContainer'>
          <input
            type={typeInputTextPassword}
            required
            placeholder='*******'
            className='input-password'
          />
          {typeInputTextPassword === 'password' ? (
            <AiFillEyeInvisible
              className='icon'
              onClick={() => {
                setTypeInputTextPassword('text')
              }}
            />
          ) : (
            <AiFillEye
              className='icon'
              onClick={() => {
                setTypeInputTextPassword('password')
              }}
            />
          )}
        </label>
        <Button
          className='btn-signIn'
          variant='contained'
          size='small'
        >
          Ingresar
        </Button>

        <label className='forgetPassword'>Olvidaste tu contraseña?</label>
      </div>
      <div className='otherSigns'>
        <label>Or Login with</label>
        <div className='containerIcons'>
          <label className='iconLoginContainer'>
            <FaFacebookF className='icon-login icon' />
          </label>
          <label className='iconLoginContainer'>
            <FcGoogle className='icon-login icon' />
          </label>
          <label className='iconLoginContainer'>
            <FaXTwitter className='icon-login icon' />
          </label>
        </div>
      </div>
    </div>
  )
}

export default Profile
