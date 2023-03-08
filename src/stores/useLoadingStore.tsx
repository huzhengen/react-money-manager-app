import create from 'zustand'

interface Loading {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useLoadingStore = create<Loading>(set => ({
  visible: false,
  setVisible: (visible: boolean) => {
    set({ visible })
  },
}))
