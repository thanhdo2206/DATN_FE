import { IMedicalExamination } from './MedicalExaminationInterfaces'

export interface ITimeSlot {
  id: number
  createdBy: null
  modifiedBy: null
  createdDate: null
  modidiedDate: null
  startTime: string
  duration: number
  medicalExamination: IMedicalExamination
}
