import { instance } from "../../config";

export async function updateItem<T>(id: string, itemData: T) {
  await instance.patch(`/items/${id}`, itemData)
}