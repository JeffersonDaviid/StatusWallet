import { useState } from 'react'
import { Link } from 'react-router-dom'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import './profile.css'
import { Button } from '@mui/material'
import { FaXTwitter } from 'react-icons/fa6'
import { PiSignOutBold } from 'react-icons/pi'
import { useAuthMethods } from '../Context/UserAuthContext'
import AlertRight from '../Components/Alert/AlertRight'

const Profile = () => {
  const { currentUser } = useAuthMethods()

  return (
    <div className='profileContainer'>
      <h2 className='logoAppContainer'>FINANZAS</h2>
      <AlertRight />

      {currentUser !== null ? <ProfileDashboard /> : <LogginDashboard />}
    </div>
  )
}

export default Profile

const ProfileDashboard = () => {
  const { currentUser, signOutSession } = useAuthMethods()

  return (
    <>
      <div className='profileDataContainer'>
        <img
          src={currentUser.photoURL}
          alt='foto de perfil'
        />
        <p>
          Bienvenido{' '}
          {currentUser.displayName != null
            ? currentUser.displayName.split(' ')[0]
            : ' amigo'}
          , es bueno verte otra vez!
        </p>

        <label
          onClick={() => {
            signOutSession()
          }}
        >
          <PiSignOutBold />
          <b>Salir</b>
        </label>
      </div>
    </>
  )
}

const LogginDashboard = () => {
  const { signInWithGoogleMobile, signInWithEmail } = useAuthMethods()

  const [userWillLoggin, setUserWillLoggin] = useState({
    email: '',
    password: '',
  })
  const updateNewUser = (property, newValue) => {
    setUserWillLoggin((prev) => ({
      ...prev,
      [property]: newValue,
    }))
  }
  const [typeInputTextPassword, setTypeInputTextPassword] = useState('password')

  return (
    <>
      <form
        id='userData'
        className='inputEmailPasswordContainer'
      >
        <input
          type='email'
          required
          placeholder='youremail@example.com'
          className='input-email'
          onChange={(evt) => {
            updateNewUser('email', evt.target.value.trim())
          }}
        />

        <label className='inputPasswordContainer'>
          <input
            type={typeInputTextPassword}
            required
            placeholder='*******'
            className='input-password'
            onChange={(evt) => {
              updateNewUser('password', evt.target.value)
            }}
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
          size='medium'
          form='userData'
          type='submit'
          onClick={() => {
            signInWithEmail(userWillLoggin)
          }}
        >
          Ingresar
        </Button>

        <label className='forgetPassword'>¿Olvidaste tu contraseña?</label>
      </form>
      <div className='otherSigns'>
        <label>Or login with</label>
        <div className='containerIcons'>
          <label className='iconLoginContainer'>
            <FaFacebookF className='icon-login icon icon-facebook' />
          </label>
          <label
            className='iconLoginContainer'
            onClick={() => {
              signInWithGoogleMobile()
            }}
          >
            <FcGoogle className='icon-login icon' />
          </label>
          <label className='iconLoginContainer'>
            <FaXTwitter className='icon-login icon icon-twitter' />
          </label>
        </div>
      </div>

      <div className='createAcountOptionContainer'>
        <label>¿No tienes una cuenta?</label> <Link>Crear cuenta</Link>
      </div>
    </>
  )
}

const createUserDashboard = () => {
  const { createNewUserWithEmailAndPassword } = useAuthMethods()

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  })
  const updateNewUser = (property, newValue) => {
    setNewUser((prev) => ({
      ...prev,
      [property]: newValue,
    }))
  }
  const [typeInputTextPassword, setTypeInputTextPassword] = useState('password')

  return (
    <form
      id='userData'
      className='inputEmailPasswordContainer'
    >
      <input
        type='email'
        required
        placeholder='youremail@example.com'
        className='input-email'
        onChange={(evt) => {
          updateNewUser('email', evt.target.value.trim())
        }}
      />
      <input
        type='email'
        required
        placeholder='youremail@example.com'
        className='input-email'
        onChange={(evt) => {
          updateNewUser('email', evt.target.value.trim())
        }}
      />
      <input
        type='email'
        required
        placeholder='youremail@example.com'
        className='input-email'
        onChange={(evt) => {
          updateNewUser('email', evt.target.value.trim())
        }}
      />

      <label className='inputPasswordContainer'>
        <input
          type={typeInputTextPassword}
          required
          placeholder='*******'
          className='input-password'
          onChange={(evt) => {
            updateNewUser('password', evt.target.value)
          }}
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
        size='medium'
        form='userData'
        type='submit'
        onClick={() => {
          createNewUserWithEmailAndPassword(newUser)
        }}
      >
        Ingresar
      </Button>

      <label className='forgetPassword'>¿Olvidaste tu contraseña?</label>
    </form>
  )
}
