import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './root'

export interface UiState {
  showSetting: boolean
  showNotification: boolean
}

const initialState: UiState = {
  showSetting: false,
  showNotification: false
}

export const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateShowSetting: (state, { payload }: PayloadAction<boolean>) => {
      state.showSetting = payload
    },
    updateshowNotification: (state, { payload }: PayloadAction<boolean>) => {
      state.showNotification = payload
    },
  }
})

export const selectUi = (state: RootState) => state.ui

export const { updateShowSetting, updateshowNotification } = UiSlice.actions

export default UiSlice.reducer
