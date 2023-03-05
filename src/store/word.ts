import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getWordList } from 'src/api/base'
import { IWord } from 'src/types/Word'
import { RootState } from './root'

export interface WordState {
  reviewCount: number // total
  reviewList: IWord[] // list
  allWordList: IWord[]
  doneCount: number
  allWordCount: number
  loading: boolean
}

const initialState: WordState = {
  reviewCount: 0,
  doneCount: 0,
  reviewList: [],
  allWordList: [],
  allWordCount: 0,
  loading: false
}

export const addVocabularyAsync = createAsyncThunk(
  'word/addVocabulary',
  async (payload: { text: string; cb?: Function }, { rejectWithValue }) => {
    try {
      const { text, cb } = payload
      // TODO: addVocabulary(text)
      // const res = await getWordList()
      // console.log(res)
      cb && cb()
      // return word
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchWordList = createAsyncThunk(
  'word/fetchWordList',
  async () => {
    try {
      // TODO: getAllAndNeedList()
      const res = await getWordList()
      return res?.data
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    updateWordList: (state, {payload}: PayloadAction<IWord>) => {
      state.reviewList = [...state.reviewList].filter(w => w.id !== payload.id)
    }
  },
  extraReducers: {
    [fetchWordList.pending.type]: (state) => {
      state.loading = true
    },
    [fetchWordList.rejected.type]: (state) => {
      state.loading = false
    },
    [fetchWordList.fulfilled.type]: (
      state,
      {
        payload
      }: PayloadAction<{
        total: number
        totalPage: number
        words: IWord[]
      }>
    ) => {
      // const { allWords, needLearnWords, doneList } = payload || {}
      const {total, totalPage , words} = payload
      state.reviewCount = total
      state.reviewList = words
      // TODO ?
      state.allWordList = words
      state.allWordCount = total
      // TODO ?
      state.doneCount = 100
      state.loading = false
    }
  }
})

export const selectWord = (state: RootState) => state.word

export default wordSlice.reducer
