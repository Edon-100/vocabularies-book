import { combineReducers } from '@reduxjs/toolkit'
import utoolReducer from './utool'
import wordReducer from './word'
import UiReducer from './ui'

const rootReducer = combineReducers({
  utool: utoolReducer,
  word: wordReducer,
  ui:UiReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
