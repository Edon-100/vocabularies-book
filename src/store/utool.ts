import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max))
}


const mockIncrement = (payload: number, timeout: number = 1000) => {
  const randomInt = getRandomInt(9)

  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      randomInt > 1
        ? resolve({ message: 'Mock increment API success!', data: payload })
        : reject({ message: 'Mock increment API error', id: 111 })
    }, timeout)
  })
}

export const incrementByAmountAsync = createAsyncThunk(
  'counter/incrementByAmount',
  async (payload: number, { rejectWithValue }) => {
    try {
      const response = await mockIncrement(payload)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)


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
    reset: () => initialState,
  },
  extraReducers: {
    // [incrementByAmountAsync.pending.type]: (state) => {
    //   state.loading = 'pending'
    // },
    [incrementByAmountAsync.fulfilled.type]: (state, { payload }: PayloadAction<number>) => {
      state.loading = 'idle'
      state.value = state.value + payload
    },
    // [incrementByAmountAsync.rejected.type]: (state, { payload }) => {
    //   state.loading = 'idle'
    //   state.error = payload
    // },
  },
})

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions

export const selectCounter = (state: RootState) => state.counter

export default counterSlice.reducer
