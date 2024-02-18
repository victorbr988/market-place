import { instance } from "../../config";

export async function createItem<T>(itemData: T) {
  await instance.post("/items", itemData)
}