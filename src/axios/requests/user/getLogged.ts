import { instance } from "../../config";

export async function getUserLogged() {
  const user = await instance.get("/users/logged")

  return user
}