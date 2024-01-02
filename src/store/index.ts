import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import notificationReducer from './notification'
import soundReducer from './sound'

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  sound: soundReducer,
})

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
