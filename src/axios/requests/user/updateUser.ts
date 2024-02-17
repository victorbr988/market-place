import { instance } from "../../config";

export async function updateUser<T>(id: string, userData: T) {
  await instance.patch(`/users/${id}`, userData)
}