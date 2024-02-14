import { instance } from "../../config";

export async function getUserById(userId: string) {
  const user = await instance.get(`/users/${userId}`)

  return user
}