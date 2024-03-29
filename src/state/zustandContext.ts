import { IUser, IUserData } from '@/axios/types'
import { create } from 'zustand'
import { persist } from "zustand/middleware"

interface Loading {
  isLoading: boolean
  setIsLoading: (state: boolean) => void
}

interface IUserStore {
  user: IUser;
  setUser: (user: IUser) => any
  setUserDefault: () => any
}

const loadingStore = create<Loading>()((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set((state) => ({ isLoading: loading })),
}))

const userStore = create<IUserStore>()(
  persist(
    set => ({
      user: {
        id: "",
        username: "",
        condo_id: "",
        email: "",
        phone: "",
        role: 0,
        session: {
          expiresIn: new Date(Date.now()).getMilliseconds()
        }
      },
      setUser: (userParam: IUser) => set(() => ({ user: userParam })),
      setUserDefault: () => set(() => ({ 
        user: {
          id: "",
          username: "",
          condo_id: "",
          email: "",
          phone: "",
          role: 0,
          session: {
            expiresIn: new Date(Date.now()).getMilliseconds()
          }
        }
      }))
    }),
    { name: "user", skipHydration: true }
  )
)

export const Context = {
  loadingStore,
  userStore
}