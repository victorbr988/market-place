import { instance } from "@/axios/config";

export async function deleteSession() {
  await instance.delete("/sessions")
}