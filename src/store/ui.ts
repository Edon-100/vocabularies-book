import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './root'

export interface UiState {
  showSetting: boolean
  showDic: boolean
}

const initialState: UiState = {
  showSetting: false,
  showDic: false
}

export const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateShowSetting: (state, { payload }: PayloadAction<boolean>) => {
      state.showSetting = payload
    },
    updateShowDic: (state, { payload }: PayloadAction<boolean>) => {
      state.showDic = payload
    },
  }
})

export const selectUi = (state: RootState) => state.ui

export const { updateShowSetting, updateShowDic } = UiSlice.actions

export default UiSlice.reducer
