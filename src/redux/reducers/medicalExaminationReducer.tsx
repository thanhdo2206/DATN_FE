import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IMedicalExaminationTime } from '../../interface/MedicalExaminationInterfaces'
import {
  filterMedicalExaminationTimeByCategoryAndPriceService,
  filterMedicalExaminationTimeByCategoryService,
  getAllMedicalExaminationTimeService,
  getDetailMedicalExaminationTimeService
} from '../../service/medicalExaminationService'
import { DispatchType } from '../configStore'

export type MedicalExaminationState = {
  arrMedicalExaminations: IMedicalExaminationTime[]
  medicalExaminationDetail: IMedicalExaminationTime | null
}

const initialState: MedicalExaminationState = {
  arrMedicalExaminations: [],
  medicalExaminationDetail: null
}

const medicalExaminationReducer = createSlice({
  name: 'medicalExaminationReducer',
  initialState,
  reducers: {
    getAllMedicalExaminationTimeAction: (
      state: MedicalExaminationState,
      action: PayloadAction<IMedicalExaminationTime[]>
    ) => {
      state.arrMedicalExaminations = action.payload
    },
    getDetailMedicalExaminationTimeAction: (
      state: MedicalExaminationState,
      action: PayloadAction<IMedicalExaminationTime>
    ) => {
      state.medicalExaminationDetail = action.payload
    }
  }
})

export const {
  getAllMedicalExaminationTimeAction,
  getDetailMedicalExaminationTimeAction
} = medicalExaminationReducer.actions

export default medicalExaminationReducer.reducer

export const filterMedicalExaminationTimeThunkByCategory = (
  categories: string[]
) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await filterMedicalExaminationTimeByCategoryService(
        categories
      )

      dispatch(getAllMedicalExaminationTimeAction(data))
    } catch (error) {
      return error
    }
  }
}

export const filterMedicalExaminationTimeThunkByCategoryAndPrice = (
  categories: string[],
  minPrice: number,
  maxPrice: number
) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await filterMedicalExaminationTimeByCategoryAndPriceService(
        categories,
        minPrice,
        maxPrice
      )

      dispatch(getAllMedicalExaminationTimeAction(data))
    } catch (error) {
      return error
    }
  }
}

export const getAllMedicalExaminationTimeThunk = () => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await getAllMedicalExaminationTimeService()

      dispatch(getAllMedicalExaminationTimeAction(data))
    } catch (error) {
      return error
    }
  }
}

export const getDetailMedicalExaminationTimeThunk = (id: string) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await getDetailMedicalExaminationTimeService(id)

      dispatch(getDetailMedicalExaminationTimeAction(data))
    } catch (error) {
      return error
    }
  }
}
