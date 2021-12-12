import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './root'

export interface UiState {
  showSetting: boolean
}

const initialState: UiState = {
  showSetting: false
}

export const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateShowSetting: (state, { payload }: PayloadAction<boolean>) => {
      state.showSetting = payload
    },
  }
})

export const selectUi = (state: RootState) => state.ui

export const { updateShowSetting } = UiSlice.actions

export default UiSlice.reducer
