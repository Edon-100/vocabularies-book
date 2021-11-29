import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './root'

type CounterState = {
  value: number
  loading: 'idle' | 'pending'
  error: any
}

const initialState: CounterState = {
  value: 0,
  loading: 'idle',
  error: null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value = state.value + 1
    },
    decrement: (state) => {
      state.value = state.value - 1
    },
    incrementByAmount: (state, { payload }: PayloadAction<number>) => {
      state.value = state.value + payload
    },
    reset: () => initialState
  }
})

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions

export const selectCounter = (state: RootState) => state.counter

export default counterSlice.reducer
