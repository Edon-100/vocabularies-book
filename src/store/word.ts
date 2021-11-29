import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './root'

export interface WordState {
  reviewCount: number // total
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

export const addVocabularyAsync = createAsyncThunk(
  'word/addVocabulary',
  async (text: string, { rejectWithValue }) => {
    try {
      const word = await window.services.wordModel.addVocabulary(text)
      return word
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchWordList = createAsyncThunk(
  'word/fetchWordList',
  async () => {
    try {
      window.services.wordModel.minimizeDbSize()
      const res = window.services.wordModel.getAllAndNeedList()
      return res
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    updateWordList: (state, word: PayloadAction<Word>) => {
      // state.value = state.value + 1
      // word.payload
    }
  },
  extraReducers: {
    [fetchWordList.fulfilled.type]: (
      state,
      {
        payload
      }: PayloadAction<{
        allWords: Word[]
        needLearnWords: Word[]
        doneList: Word[]
      }>
    ) => {
      const { allWords, needLearnWords, doneList } = payload
      state.reviewCount = needLearnWords.length
      state.reviewList = needLearnWords
      state.allWordList = allWords
      state.doneCount = doneList.length
    }
  }
})

export const selectWord = (state: RootState) => state.word

export default wordSlice.reducer
