import { RouteObject } from 'react-router-dom'

import AppointmentDoctor from '../pages/doctorPages/appointmentDoctor/AppointmentDoctor'
import AppointmentPatientOfDoctor from '../pages/doctorPages/appointmentDoctor/AppointmentPatientOfDoctor'
import MainDoctor from '../pages/doctorPages/homeDoctor/MainDoctor'
import ScheduleTiming from '../pages/doctorPages/scheduleTiming/ScheduleTiming'
import AuthRoute from '../utils/AuthRoute'
import { Role } from '../utils/roles'

const doctorRoutes: RouteObject[] = [
  {
    path: 'doctor',
    element: (
      <AuthRoute roles={Role.Doctor}>
        <MainDoctor />
      </AuthRoute>
    ),
    children: [
      {
        path: 'appointment',
        element: <AppointmentDoctor />
      },
      {
        path: 'schedule-timing',
        element: <ScheduleTiming />
      },
      {
        path: 'appointment-patient-of-doctor/:patientId',
        element: <AppointmentPatientOfDoctor />
      }
    ]
  }
]

export default doctorRoutes
