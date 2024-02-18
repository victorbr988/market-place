import { instance } from "@/axios/config";

export async function getCondos() {
  const condos = await instance.get("/condos")

  return condos
}