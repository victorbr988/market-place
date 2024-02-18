import { instance } from "@/axios/config";
import { IUserCreate } from "@/axios/types";

export async function createUser(userData: IUserCreate) {
  await instance.post("/users", userData)
}