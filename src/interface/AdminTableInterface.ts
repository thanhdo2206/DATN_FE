export interface AdminTableColumn {
  id:
    | 'id'
    | 'departmentName'
    | 'actions'
    | 'doctorName'
    | 'patientName'
    | 'apptDate'
    | 'status'
    | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
}

export interface TableAppointment {
  id: number
  doctorName: string
  profilePictureDoctor: string
  patientName: string
  profilePicturePatient: string
  apptDate: string
  startTime: string
  endTime: string
  status: number
}

export interface TableDepartment {
  id: number
  departmentName: string
  departmentPicture: string
}

export interface TablePatient {
  id: number
  patientName: string
  gmail: string
  phoneNumber: string
  address: string
}
