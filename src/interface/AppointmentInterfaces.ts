import { ITimeSlot } from './TimeSlotInterfaces'
import { UserInformation } from './UsersInterface'

export interface IAppointment {
  id: number
  createdBy: null
  modifiedBy: null
  createdDate: null
  modidiedDate: null
  status: number
  patient: UserInformation
  timeSlot: ITimeSlot
}

export interface IAppointmentPageable {
  pageIndex: number
  totalPage: number
  listAppointmentResult: IAppointment[]
}
