// Start of conection to FIREBASE
import { initializeApp } from 'firebase/app'
// AUTHENTICATION
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

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
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
