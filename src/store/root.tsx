import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './utool'
import wordReducer from './word'
import UiReducer from './ui'

const rootReducer = combineReducers({
  counter: counterReducer,
  word: wordReducer,
  ui:UiReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
