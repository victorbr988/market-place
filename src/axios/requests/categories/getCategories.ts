import { instance } from "../../config"

export async function getCategories(type?: number) {
  try {
    const categories = await instance.get(`/categories?type=${type || ""}`)
    return categories.data
  } catch(error) {
    console.log(error)
  }
}