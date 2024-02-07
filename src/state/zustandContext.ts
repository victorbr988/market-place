import { create } from 'zustand'

interface Loading {
  isLoading: boolean
  setIsLoading: (state: boolean) => void
}

const loadingStore = create<Loading>()((set) => ({
  isLoading: false,
  setIsLoading: () => set((state) => ({ isLoading: state.isLoading })),
}))

export const Context = {
  loadingStore
}