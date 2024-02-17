import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
})

instance.interceptors.response.use(async (response) => response, async (error: AxiosError) => {
  if(error.response) {
    if(error.response.status === 401) {
      localStorage.removeItem("user")
      window.open("http://localhost:3000/login")
      toast.error("Sessão expirada")
    }
  }
})