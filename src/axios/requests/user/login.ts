import { instance } from "../../config";
import { IUserLogin } from "../../types";

export async function login(userLogin: IUserLogin) {
  await instance.post("/sessions", userLogin)
}