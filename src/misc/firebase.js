import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config={
  apiKey: "AIzaSyD_O1fbGph9B_sb8Y761dn6cdHWNqyaNzY",
  authDomain: "chat-app-dde3b.firebaseapp.com",
  projectId: "chat-app-dde3b",
  storageBucket: "chat-app-dde3b.appspot.com",
  messagingSenderId: "701319805610",
  appId: "1:701319805610:web:028b9adb0c7ab69b88aed3"
}

const app =firebase.initializeApp(config)
export const auth = app.auth()
export const database = app.database()
export const storage=app.storage()