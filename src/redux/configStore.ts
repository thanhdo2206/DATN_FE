import { configureStore } from '@reduxjs/toolkit'

import appointmentReducer from './slices/appointmentSlice'
import authReducer from './slices/authSlice'
import medicalExaminationReducer from './slices/medicalExaminationSlice'
import timeSlotsReducer from './slices/timeSlotSlice'

export type DispatchType = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    auths: authReducer,
    medicalExaminationReducer,
    appointmentReducer,
    timeSlotsReducer
  }
})
