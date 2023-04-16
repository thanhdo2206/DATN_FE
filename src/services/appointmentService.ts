import requestApi from '../utils/requestApi'

export const bookAppointmentService = async (
  doctorId: number,
  timeSlotId: number
) => {
  try {
    const response = await requestApi({
      url: `/appointments/book_appointment`,
      method: 'post',
      data: {
        doctorId,
        timeSlotId
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const changeStatusAppointmentService = async (
  appointmentId: number,
  appointmentStatus: number
) => {
  try {
    const response = await requestApi({
      url: `/appointments/change_status_appointment/${appointmentId}`,
      method: 'patch',
      data: {
        status: appointmentStatus
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const getAllAppointmentDoctorPageableService = async (
  pageIndex: number,
  limit: number,
  appointmentStatus: number
) => {
  try {
    const response = await requestApi({
      url: `/appointments/doctor/pageable?pageIndex=${pageIndex}&limit=${limit}&appointmentStatus=${appointmentStatus}`,
      method: 'get'
    })
    return response.data
  } catch (error) {
    return error
  }
}

export const getAllAppointmentPatientForDoctorService = async (
  patientId: string
) => {
  try {
    const response = await requestApi({
      url: `/appointments/doctor/patient?patientId=${patientId}`,
      method: 'get'
    })
    return response.data
  } catch (error) {
    return error
  }
}
