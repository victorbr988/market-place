import { FirebaseError } from "firebase/app";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/Auth/google/auth";


export async function getUserCredentialsGoogleAccount() {
  try { 
    const userCredential = await signInWithPopup(auth, provider)
    const { uid: id, displayName: name, email, phoneNumber: phone } = userCredential.user
    return { id, name, email, phone }
  } catch(err: unknown) {

    if(err instanceof FirebaseError) {
      return err.code
    }

    console.dir(err)
    throw err
  }
}