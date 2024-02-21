import { FirebaseError } from "firebase/app";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/Auth/facebook/auth";


export async function getUserCredentialsFacebookAccount() {
  try { 
    const userCredential = await signInWithPopup(auth, provider)
    return userCredential
  } catch(err: unknown) {

    if(err instanceof FirebaseError) {
      return err.code
    }

    console.dir(err)
    throw err
  }
}