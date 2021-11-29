import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './utool'
import wordReducer from './word'

const rootReducer = combineReducers({
  counter: counterReducer,
  word: wordReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
