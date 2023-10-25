// Start of conection to FIREBASE
import { initializeApp } from 'firebase/app'
// AUTHENTICATION
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

// START FIREBASE
export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

// const email = prompt('Ingrese usuario')
// const password = prompt('Ingrese contraseña')
let user

export const createNewUserWithEmailAndPassword = () => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((newUser) => {
      user = newUser.user
      alert('Usuario ', user, ' ha sido registrado')
      console.log(newUser)
    })
    .catch((error) => {
      console.error('CODIGO ', error.code)
      console.error('MENSAJE ', error.message)
    })

  console.log(user)
}

export const signInWithEmailAndPasswordFront = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userSignIn) => {
      alert('Bievenido: ', userSignIn.user.email)
    })
    .catch((error) => {
      console.error('Error', error.code)
    })
  console.log(user)
}
