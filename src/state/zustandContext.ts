import { create } from 'zustand'

interface Loading {
  isLoading: boolean
  setIsLoading: (state: boolean) => void
}

const loadingStore = create<Loading>()((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set((state) => ({ isLoading: loading })),
}))

export const Context = {
  loadingStore
}