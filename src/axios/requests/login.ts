import { instance } from "../config";
import { IUserLogin } from "../types";

export async function login(userLogin: IUserLogin) {
  try {
    await instance.post("/sessions", userLogin)
  } catch (error) {
    console.log(error)
  }
}