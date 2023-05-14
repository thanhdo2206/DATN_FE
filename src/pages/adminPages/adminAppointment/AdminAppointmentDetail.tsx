import '../../../assets/css/pages/adminPage/adminAppointment/admin_appointment_detail.css'
import AdminAppoitnmentDetailBox from './AdminAppoitnmentDetailBox'

type Props = {
  idAppointment: number
}

export interface DataAdminDetailAppointment {
  title: string
  data: string
}
function AdminAppointmentDetail(props: Props) {
  const { idAppointment } = props
  console.log(idAppointment)
  const patientInfor: DataAdminDetailAppointment[] = [
    { title: 'gmail', data: 'patient@gmail.com' },
    { title: 'gender', data: 'female' },
    { title: 'age', data: '30' },
    { title: 'phone number', data: '0987113453' },
    { title: 'address', data: '20 Ton Duc Thang, quan Lien Chieu, Da Nang' }
  ]

  const doctorInfor: DataAdminDetailAppointment[] = [
    { title: 'department', data: 'neutro' },
    { title: 'gmail', data: 'patient@gmail.com' },
    { title: 'gender', data: 'female' },
    { title: 'age', data: '30' },
    { title: 'phone number', data: '0987113453' },
    { title: 'address', data: '20 Ton Duc Thang, quan Lien Chieu, Da Nang' }
  ]

  const appointmentInfor: DataAdminDetailAppointment[] = [
    { title: 'appointment date', data: 'Monday - 4/17/2023' },
    { title: 'time', data: '8h - 8h30' },
    { title: 'price', data: '400$' },
    { title: 'status', data: '1' }
  ]

  return (
    <div className='admin__apptdetail--container'>
      <AdminAppoitnmentDetailBox
        dataInfor={patientInfor}
        title='Appointment From: '
        name='patient name'
        status={true}
      />
      <AdminAppoitnmentDetailBox
        dataInfor={doctorInfor}
        title='Appointment To: '
        name='doctor name'
        status={true}
      />
      <AdminAppoitnmentDetailBox
        dataInfor={appointmentInfor}
        title='Appointment Information: '
        name='doctor name'
        status={false}
      />
    </div>
  )
}

export default AdminAppointmentDetail
