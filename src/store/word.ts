import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './root'

export interface WordState {
  reviewCount: number
  reviewList: Word[] // list
  allWordList: Word[]
  doneCount: number
}

const initialState: WordState = {
  reviewCount: 0,
  doneCount: 0,
  reviewList: [],
  allWordList: []
}

export const counterSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    updateWordList: (state, word: PayloadAction<Word>) => {
      // state.value = state.value + 1
			// word.payload
    }
  }
})
