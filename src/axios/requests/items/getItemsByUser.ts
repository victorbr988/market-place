import { instance } from "../../config"

export async function getItemsByUserId(userId: string) {
  try {
    const items = await instance.get(`/items/seler/${userId}`)

    return items
  } catch(error) {
    console.log(error)
  }
}