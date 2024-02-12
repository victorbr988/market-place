import { instance } from "../config"

export async function getItems() {
  try {
    const items = await instance.get("/items")

    return items
  } catch(error) {
    console.log(error)
  }
}