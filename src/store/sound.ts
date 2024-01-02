import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { AVPlaybackStatus } from 'expo-av'

interface SoundPlayback {
  sound: any
  status: AVPlaybackStatus | null
}

const initialState: SoundPlayback = {
  sound: null,
  status: null,
}

const slice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    updateSoundPlayback(state, action: PayloadAction<SoundPlayback>) {
      state.sound = action.payload.sound
      state.status = action.payload.status
    },
  },
})

export const getSoundState = createSelector(
  (state: RootState) => state,
  ({ sound }) => sound
)
export const { updateSoundPlayback } = slice.actions

export default slice.reducer
