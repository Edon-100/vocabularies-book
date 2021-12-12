import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './root'

export const initialUtoolState: UtoolState = {
  closeAfterAddWord: true,
}

export const UtoolSlice = createSlice({
  name: 'utool',
  initialState: initialUtoolState,
  reducers: {
    updateCloseAfterAddWord: (state, { payload }: PayloadAction<boolean>) => {
      state.closeAfterAddWord = payload
    },
    setUtoolSetting: (state, { payload }: PayloadAction<Partial<UtoolState>>) => {
      state = Object.assign(state, payload)
    },
  }
})

export const selectUtool = (state: RootState) => state.utool

export const { updateCloseAfterAddWord, setUtoolSetting } = UtoolSlice.actions

export default UtoolSlice.reducer
