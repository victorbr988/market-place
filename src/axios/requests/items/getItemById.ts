import { instance } from "../../config"

export async function getItemsById(itemId: string) {
  const item = await instance.get(`/items/${itemId}`)

  return item
}