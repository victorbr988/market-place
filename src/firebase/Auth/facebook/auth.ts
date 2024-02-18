import { initializeApp } from "firebase/app"
import { FacebookAuthProvider, getAuth } from "firebase/auth";
import firebaseConfig from "@/firebase/config"

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const provider = new FacebookAuthProvider()