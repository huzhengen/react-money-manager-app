import create from 'zustand'

interface Menu {
  visible: boolean
  setVisible: (visible: boolean) => void
}
export const useMenuStore = create<Menu>(set => ({
  visible: false,
  setVisible: (visible: boolean) => {
    set({ visible })
  },
}))
