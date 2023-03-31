import { ITimeSlot } from './TimeSlotInterfaces'

export interface IMedicalExamination {
  id: number
  createdBy: null
  modifiedBy: null
  createdDate: null
  modidiedDate: null
  examinationPrice: number
  title: string
  shortDescription: string
  description: string
  examinationObject: number
  image: string
}

export interface IMedicalExaminationFilter {
  category: string[]
  minPrice: number
  maxPrice: number
}

export interface IMedicalExaminationTime {
  medicalExamination: IMedicalExamination
  listTimeSlot: ITimeSlot[]
}
