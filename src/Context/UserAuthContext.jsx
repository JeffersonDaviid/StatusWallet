import React, { createContext, useContext, useEffect, useState } from 'react'
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

export const UserAuthContext = createContext()

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

  const createNewUserWithEmailAndPassword = (newUser) => {
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCreated) => {
        // FALTA IMPLEMENTACION
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  /**
   VENTANA POP - Ingreso para computadores - Comodidad
   */
  const signInWithGooglePc = () => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        console.error(error.message)
      })
  }

  /**
   * VENTANA REDIRECT - Ingreso para telefonos - Comodidad
   */
  const signInWithGoogleMobile = () => {
    signInWithRedirect(auth, provider)

    getRedirectResult(auth)
      .then((result) => {})
      .catch((error) => {
        console.error(error.message)
      })

    updateNewUser('isLogged', true)
    setUserLogged(auth.currentUser)
  }

  const signInWithEmail = (user) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userSignIn) => {
        setCurrentUser(userSignIn)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }

  const signOutSession = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error.message)
      })
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
