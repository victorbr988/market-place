import axios, { AxiosError } from "axios"

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
})

instance.interceptors.response.use(async (response) => response, async (error: AxiosError) => {
  if(error.response) {
    if(error.response.status === 400) {
      return Promise.reject("Algo deu errado")
    }
    if(error.response.status === 401) {
      if((error.response.data as any).error === "Passwords does not match") {
        localStorage.removeItem("user")
        return Promise.reject("E-mail e/ou senha inválidos")
      }
      
      window.open(`${window.location.href.split('/')[0]}/login?session=expired`)
      return Promise.reject()
    }
    if(error.response.status === 404) {
      return Promise.reject("Recurso não encontrado")
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
    
    throw error
  }
})

//https://nominatim.openstreetmap.org/search.php?q=Rua%20xingu%20Caruaru&polygon_geojson=1&accept-language=Brasil&countrycodes=BR&format=jsonv2
