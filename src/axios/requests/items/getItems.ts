import { instance } from "../../config"
import { IGetItemsQuery } from "../../types"

export async function getItems(query?: IGetItemsQuery) {
  try {
    const items = await instance.get(
      `/items?search=${query?.search || ''}&category=${query?.category || ''}`
    )

      return items
  } catch(error) {
    console.log(error)
  }
}