import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAlert } from './AlertContext'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'

// Configurations for conection to Firebase THIS IS UNIQUE INFORMATION - IS A REGISTER OF THE APP
const firebaseConfig = {
  apiKey: 'AIzaSyDN_df2anr8iG-UdIKCsHlnpy_nE4zB_YM',
  authDomain: 'statuswallet-aae6d.firebaseapp.com',
  projectId: 'statuswallet-aae6d',
  storageBucket: 'statuswallet-aae6d.appspot.com',
  // NO LO USAREMOS
  // messagingSenderId: "921059159041",
  // appId: "1:921059159041:web:751c1f0f9e0927f15c6400"
}
const app = initializeApp(firebaseConfig)

const UserAuthContext = createContext()

export const UserAuthContextProvider = ({ children }) => {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    // Limpia el suscriptor cuando el componente se desmonta
    return () => unsubscribe()
  }, [auth])

  return (
    <UserAuthContext.Provider
      value={{
        auth,
        provider,

        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

export const useAuthMethods = () => {
  const { auth, provider, currentUser, setCurrentUser } = useContext(UserAuthContext)
  const { typeAlerts, showAlert } = useAlert()

  const createNewUserWithEmailAndPassword = (newUser) => {
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCreated) => {
        // FALTA IMPLEMENTACION
      })
      .catch((error) => handleErrorFirebase(error))
  }

  /**
   VENTANA POP - Ingreso para computadores - Comodidad
   */
  const signInWithGooglePc = () => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => handleErrorFirebase(error))
  }

  /**
   * VENTANA REDIRECT - Ingreso para telefonos - Comodidad
   */
  const signInWithGoogleMobile = () => {
    signInWithRedirect(auth, provider)

    getRedirectResult(auth)
      .then((result) => {})
      .catch((error) => console.error(error.message))
  }

  const signInWithEmail = (user) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userSignIn) => {
        setCurrentUser(userSignIn)
      })
      .catch((error) => handleErrorFirebase(error))
  }

  const signOutSession = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => handleErrorFirebase(error))
  }

  const handleErrorFirebase = (error) => {
    if (error.code === 'auth/wrong-password') {
      // Personaliza el mensaje de error para contraseña incorrecta
      showAlert(
        'La contraseña ingresada es incorrecta. Por favor, inténtalo de nuevo.',
        typeAlerts.error
      )
    } else if (error.code === 'auth/user-not-found') {
      // Personaliza el mensaje de error para usuario no encontrado
      showAlert(
        'No se encontró una cuenta con este correo electrónico. Regístrate o verifica tus credenciales.',
        typeAlerts.error
      )
    } else if (error.code === 'auth/invalid-email') {
      // Personaliza el mensaje de error para correo electrónico inválido
      showAlert(
        'El formato del correo electrónico es inválido. Por favor, verifica tu correo electrónico.',
        typeAlerts.error
      )
    } else if (error.code === 'auth/invalid-login-credentials') {
      // Personaliza el mensaje de error para correo electrónico inválido
      showAlert(
        'El formato del correo electrónico es inválido. Por favor, verifica tu correo electrónico.',
        typeAlerts.error
      )
    } else if (error.code === 'auth/email-already-in-use') {
      // Personaliza el mensaje de error para correo electrónico ya en uso
      showAlert(
        'Este correo electrónico ya está en uso. ¿Olvidaste tu contraseña?',
        typeAlerts.error
      )
    } else if (error.code === 'auth/weak-password') {
      // Personaliza el mensaje de error para contraseña débil
      showAlert(
        'La contraseña debe tener al menos 8 caracteres y contener números y letras.',
        typeAlerts.error
      )
    } else {
      // Manejar otros errores de autenticación de Firebase
      console.error(error.message)
    }
  }

  return {
    currentUser,

    createNewUserWithEmailAndPassword,

    signInWithGooglePc,
    signInWithGoogleMobile,
    signInWithEmail,

    signOutSession,
  }
}
