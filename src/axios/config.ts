import axios, { AxiosError } from "axios"

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
})

instance.interceptors.response.use(async (response) => response, async (error: AxiosError) => {
  if(error.response) {
    if(error.response.status === 401) {
      if((error.response.data as any).error === "Passwords does not match") {
        localStorage.removeItem("user")
        return Promise.reject("E-mail e/ou senha inválidos")
      }
      
      window.open("http://localhost:3000/login?session=expired")
      return Promise.reject()
    }
    if(error.response.status === 409) {
      if((error.response.data as any).error === "Email already registered") {
        localStorage.removeItem("user")
        return Promise.reject("E-mail já registrado")
      }
      throw error
    }
    if(error.response.status === 500) {
      return Promise.reject("Erro interno do servidor")
    }

    if(error.response.status !== 500) {
      return Promise.reject("Erro interno do servidor")
    }
    
    throw Promise.reject("Algo deu errado")
  }
})

//https://nominatim.openstreetmap.org/search.php?q=Rua%20xingu%20Caruaru&polygon_geojson=1&accept-language=Brasil&countrycodes=BR&format=jsonv2
