import { configureStore } from '@reduxjs/toolkit'

import medicalExaminationReducer from './reducers/medicalExaminationReducer'

export type DispatchType = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    medicalExaminationReducer
  }
})
