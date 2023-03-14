import create from 'zustand'

type List = {
  list: Tag[]
  setList: (list: Tag[]) => void
}

export const useTagsStore = create<List>(set => ({
  list: [],
  setList: (list: Tag[]) => {
    set((state) => {
      return { list }
    })
  },
}))
