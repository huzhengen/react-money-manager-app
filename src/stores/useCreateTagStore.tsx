import create from 'zustand'
import type { FormError } from '../lib/validate'

type Data = Tag

interface CreateTag {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateTagStore = create<CreateTag>(set => ({
  data: {
    kind: 'expenses',
    name: '',
    sign: '😀'
  },
  error: {
    kind: [],
    name: [],
    sign: []
  },
  setData: (data: Partial<Data>) => {
    set(state => ({
      ...state,
      data: {
        ...state.data,
        ...data
      }
    }))
  },
  setError: (error: Partial<FormError<Data>>) => {
    set(state => ({
      ...state,
      error: {
        ...error
      }
    }))
  }
}))
