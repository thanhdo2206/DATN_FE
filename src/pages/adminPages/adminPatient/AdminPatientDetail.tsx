import React from 'react'

import '../../../assets/css/pages/adminPage/adminPatient/admin_patient_detail.css'
import { DataAdminDetailAppointment } from '../adminAppointment/AdminAppointmentDetail'
import AdminAppointmnetDetailBoxAvatar from '../adminAppointment/AdminAppointmnetDetailBoxAvatar'
import AdminAppoitnmentDetailBox from '../adminAppointment/AdminAppoitnmentDetailBox'

type Props = {
  patientId: number
}

function AdminPatientDetail(props: Props) {
  const { patientId } = props
  console.log(patientId)
  const patientInfor: DataAdminDetailAppointment[] = [
    { title: 'gmail', data: 'patient@gmail.com' },
    { title: 'gender', data: 'female' },
    { title: 'age', data: '30' },
    { title: 'phone number', data: '0987113453' },
    { title: 'address', data: '20 Ton Duc Thang, quan Lien Chieu, Da Nang' }
  ]
  const patientName = 'patient name'
  return (
    <div className='admin__patient--detail'>
      <div className='patient__detail--header'>
        <AdminAppointmnetDetailBoxAvatar
          name={patientName}
          profilePicture={
            'https://uko-react.vercel.app/static/avatar/001-man.svg'
          }
        />
      </div>
      <div className='patient__detail--body'>
        <AdminAppoitnmentDetailBox
          dataInfor={patientInfor}
          title='About: '
          name='doctor name'
          status={false}
        />
      </div>
    </div>
  )
}

export default AdminPatientDetail
