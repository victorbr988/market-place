import { instance } from "@/axios/config";

export async function getStreetByCep(cep: number) {
  const street = await instance.get(`https://viacep.com.br/ws/${cep}/json/`)

  return street.data
}