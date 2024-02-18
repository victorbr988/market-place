import { instance } from "../../config"
import { IGetUsersQuery } from "../../types"

export async function getUsers(query?: IGetUsersQuery) {
  try {
    const users = await instance.get(
      `/users?role=${query?.role || ''}&condo_id=${query?.condo_id || ''}`
    )

    return users
  } catch(error) {
    console.log(error)
  }
}