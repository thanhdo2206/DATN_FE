import { RouteObject } from 'react-router-dom'

import AppointmentDoctor from '../pages/doctorPages/appointmentDoctor/AppointmentDoctor'
import MainDoctor from '../pages/doctorPages/homeDoctor/MainDoctor'
import ScheduleTiming from '../pages/doctorPages/scheduleTiming/ScheduleTiming'
import BookAppointment from '../pages/patientPages/bookAppointment/BookAppointment'
import AuthRoute from '../utils/AuthRoute'
import { Role } from '../utils/roles'

const patientRoutes: RouteObject[] = [
  {
    path: 'book-appointment/:id',
    element: (
      <AuthRoute roles={Role.Patient}>
        <BookAppointment />
      </AuthRoute>
    )
  }
]

export default patientRoutes
